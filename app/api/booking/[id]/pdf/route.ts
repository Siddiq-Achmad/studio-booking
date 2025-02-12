import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer";

const prisma = new PrismaClient();

export async function GET(req: NextRequest,  context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    

    if (!id) {
      return NextResponse.json({ error: "Missing booking ID" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Buka browser Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Buat HTML Invoice
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Plus Jakarta Sans, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; }
            h1 { text-align: center; }
            .invoice-details { margin-top: 20px; }
            .invoice-details p { margin: 5px 0; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
            .footer { text-align: center; margin: 20px; position: fixed; bottom: 0; left: 0; width: 100%; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Invoice</h1>
            <p>Invoice ID: #${booking.id}</p>
            <p>Status: ${booking.status}</p>
            <hr>
            <div class="invoice-details">
              <p><strong>Name:</strong> ${booking.name}</p>
              <p><strong>Email:</strong> ${booking.email}</p>
              <p><strong>Phone:</strong> ${booking.phone}</p>
              <p><strong>WhatsApp:</strong> ${booking.whatsapp}</p>
              ${booking.instagram ? `<p><strong>Instagram:</strong> @${booking.instagram}</p>` : ""}
              <p><strong>Session Type:</strong> ${booking.sessionType}</p>
              <p><strong>Booking Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Booking Time:</strong> ${booking.bookingTime}</p>
              <p class="total">Total Amount: Rp 300.000</p>
            </div>
            
          </div>
          <div class="footer">
            <h6>&copy; 2025, LUXIMA.ID <h6> 
            Address: Jl. Mohd. Hasan, No. 257, Banda Aceh
            <br/>  Phone: 0811 611 1662<br/>  
            Email: <a href="mailto:hello@luxima.id">hello@luxima.id</a><br/>  
            Website: <a href="https://luxima.id">luxima.id</a></h6>
            </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice-${booking.id}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
