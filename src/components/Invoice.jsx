import '../styles/Invoice.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Invoice() {
	const totalAmount = localStorage.getItem('totalAmount');
	const userName = localStorage.getItem('userName');
	const confirmed_seva_name = localStorage.getItem('confirmed_seva_name');
	const phoneNum = localStorage.getItem('phn');
	const recString = localStorage.getItem('recString');
	const qty = localStorage.getItem('qty') || 1;

	const now = localStorage.getItem('formattedTime')
	

	const handleDownloadPDF = async () => {
		const element = document.querySelector('.invoice-page');
		const canvas = await html2canvas(element, { scale: 2, useCORS: true });
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('p', 'mm', 'a4');

		const pageWidth = pdf.internal.pageSize.getWidth();
		const pageHeight = pdf.internal.pageSize.getHeight();

		const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
		const pdfWidth = canvas.width * ratio;
		const pdfHeight = canvas.height * ratio;

		const x = (pageWidth - pdfWidth) / 2;
		const y = 10;

		pdf.addImage(imgData, 'PNG', x, y, pdfWidth, pdfHeight);
		pdf.save(`sevaBooked_${recString}.pdf`);
	};

	return (
		<>

		<div className='block-div'>
			<p>PLEASE SCROLL DOWN FOR DOWNLOADING THE INVOICE</p>
		</div>
		<div className='invoice-page'>
			<h1 className='in-title'>Shree Mahalasa Saunsthan</h1>
			<div className='address-fields'>
				<p>Mardol, Goa</p>
				<p>Phone : 1234567890</p>
			</div>
			<div className='invoice-heading'>Invoice</div>

			<div className='invoice-container'>
				<div className='in-field-row'>
					<p>Sevaadar</p>
					<p>Receipt No</p>
					<p>Phone</p>
					<p>Date Booked</p>
				</div>
				<div className='in-field-values'>
					<p>{userName}</p>
					<p>{recString} </p>
					<p>{phoneNum} </p>
					<p>{now}</p>
				</div>

				<div className='in-qty'>
					<table className='in-qty-table'>
						<thead>
							<tr>
								<th>Sl No</th>
								<th>Seva</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>{confirmed_seva_name}</td>
								<td>{qty}</td>
							</tr>
							<tr className='tr-total'>
								<td colSpan="2">Total</td>
								<td>{totalAmount}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className='contents'>
				<p>Kindly Pay the Amount at the desk</p>
				<p>THANK YOU FOR BOOKING THE SEVA</p>
				<h4 className='jai-mahalasa-text'>JAI MAHALASA</h4>
			</div>
		</div>
			<button onClick={handleDownloadPDF}>Download PDF</button>
		</>
	);
}

export default Invoice;
