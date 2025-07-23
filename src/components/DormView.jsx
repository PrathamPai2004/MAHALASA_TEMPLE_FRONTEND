import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/Dorm.css';
import RoomBookingSuccess from "./RoomBookingSuccess";

// ConfirmBooking modal component
function ConfirmBooking({
  roomNumber,
  holderName,
  phone,
  setHolderName,
  setPhone,
  BookTheRoom,
  setBookingStatus,
}) { 

  // const [holderName,setHolderName] = useState("")
  localStorage.setItem('holder_name',holderName)
  return (
    <div className="">
      <div id="confirm-container-dorm" className="confirm-container-dorm">
        <form
          className="confirm-form"
          onSubmit={(e) => {
            e.preventDefault();
            BookTheRoom(roomNumber);
          }}
        >
          <p className="confirm-room-booking-text">
            Do you want to book Room no - {<span style={{color:"darkblue"}}>{roomNumber}</span> } ?
          </p>
          <input
            type="text"
            placeholder="Your name"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="flex justify-end gap-2" id="confirm-btns">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Book
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setBookingStatus(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DormView() {
  const { dormName } = useParams();
  const [rooms, setRooms] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);
  const [holderName, setHolderName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomDisplayError, setRoomDisplayError] = useState(false);
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const [connectionRecovered, setConnectionRecovered] = useState(false);

  localStorage.setItem('holder_name_set',holderName);
  console.log(holderName)

  // Fetch rooms
  const fetchRooms = () => {
    axios
      .get(`http://localhost:3001/rooms/${dormName}`)
      .then((res) => {
        setRooms(res.data);

        // If there was a previous error, show "Good connection..." for 1s
        if (roomDisplayError) {
          setConnectionRecovered(true);
          setTimeout(() => setConnectionRecovered(false), 2000);
        }

        setRoomDisplayError(false); // Clear error state
      })
      .catch((err) => {
        console.error("Error ---> " + err.message);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, [dormName]);

  // Detect network failure after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (rooms.length === 0) {
        setRoomDisplayError(true);
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [rooms]);

  // Book button click
  const handleBook = async (roomNumber) => {
    setRoomNumber(roomNumber);
    localStorage.setItem("roomNumber", roomNumber);
    setBookingStatus(true);
  };

  // Confirm booking
  const BookTheRoom = async (roomNumber) => {
    if (!holderName || !phone) {
      alert("Please fill out all fields.");
      return;
    }

    const cur_date = Date.now();
    await axios
      .post(`http://localhost:3001/rooms/books`, {
        dormitory: dormName,
        roomNumber: roomNumber,
        holderName: holderName,
        Date: cur_date,
        phoneNumber: phone,
      })
      .then(() => {
        const updatedRooms = rooms.map((room) =>
          room.roomNumber === roomNumber
            ? { ...room, isBooked: true }
            : room
        );
        setRooms(updatedRooms);
        setBookingStatus(false);
        setHolderName("");
        setPhone("");
        setIsRoomBooked(true);
      })
      .catch((err) => console.error("Booking failed", err));
  };

  return (
    <div className="relative min-h-screen p-6">
      {/* Booking success popup */}
      {isRoomBooked && (
        <RoomBookingSuccess
          roomNum={roomNumber}
          dorm={dormName}
          holderName={holderName}
        />
      )}

      {/* Booking modal */}
      {bookingStatus && (
        <ConfirmBooking
          roomNumber={roomNumber}
          holderName={holderName}
          phone={phone}
          setHolderName={setHolderName}
          setPhone={setPhone}
          BookTheRoom={BookTheRoom}
          setBookingStatus={setBookingStatus}
        />
      )}

      {/* Room list display */}
      <h2 className="text-xl font-bold mb-4">Rooms in {dormName}</h2>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-4 w-max">
          {rooms.length > 0 ? (
            <>
              {connectionRecovered && (
                <div className="text-green-600 font-semibold mb-2">
                  ✅ Good connection...
                </div>
              )}
              {rooms.map((room) => (
                <div
                  key={room.roomNumber}
                  className={`min-w-[200px] flex-shrink-0 p-4 border rounded ${
                    room.isBooked ? "bg-red-200" : "bg-green-100"
                  }`}
                >
                  <h3 className="text-lg font-semibold">
                    Room {room.roomNumber}
                  </h3>
                  <p>Status: {room.isBooked ? "Booked" : "Available"}</p>
                  {!room.isBooked && (
                    <button
                      className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                      onClick={() => handleBook(room.roomNumber)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="room-booking-error-container">
              {roomDisplayError ? (
                <p className="text-red-600 font-medium">
                  ⚠️ Network Error: Failed to load rooms.
                </p>
              ) : (
                <p>Loading rooms...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DormView;
