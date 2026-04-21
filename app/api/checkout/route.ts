import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// 1. Définition des interfaces pour les données reçues
interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  selectedTaille?: string;
  selectedColor?: string;
  image?: string;
}

interface OrderRequestBody {
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  shippingMethod: string;
  notes?: string;
  items: OrderItem[];
  subtotal: string;
  total: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: OrderRequestBody = await req.json();

    // Vérification des variables d'environnement
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { success: false, message: "Configuration serveur incomplète" },
        { status: 500 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      paymentMethod,
      shippingMethod,
      notes,
      items,
      subtotal,
      total,
    } = body;

    // Configuration du transporteur Mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- PRÉPARATION DES DONNÉES ---

    // Nettoyage du numéro de téléphone pour le lien WhatsApp
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const whatsappLink = `https://wa.me/${
      cleanPhone.startsWith("0") ? cleanPhone.replace("0", "212") : cleanPhone
    }`;

    // Date et Heure
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timeFormatted = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Génération des lignes produits en HTML
    const itemsHtml = items
      .map(
        (item: OrderItem) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0;">
                <div style="font-weight: bold; color: #111; font-size: 14px;">${item.name}</div>
                <div style="color: #6b7280; font-size: 12px;">
                    ${item.selectedTaille ? `Taille: <strong>${item.selectedTaille}</strong>` : ""} 
                    ${item.selectedColor ? ` | Couleur: <strong>${item.selectedColor}</strong>` : ""}
                </div>
            </td>
            <td style="padding: 12px 0; text-align: center; color: #111; font-weight: bold;">x ${item.quantity}</td>
            <td style="padding: 12px 0; text-align: right; color: #111;">
                ${new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD" }).format(item.price)}
            </td>
        </tr>`
      )
      .join("");

    // --- TEMPLATE HTML ---
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Nouvelle Commande</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 20px 0;">
            <tr>
                <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <tr>
                            <td style="background-color: #111827; padding: 25px; text-align: center; border-bottom: 4px solid #EAB308;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase;">Nouvelle Commande</h1>
                                <p style="color: #EAB308; margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${total}</p>
                                <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 12px;"> ${dateFormatted} à ${timeFormatted}</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h3 style="color: #6B7280; font-size: 12px; text-transform: uppercase; margin: 0 0 10px 0;">👤 Informations Client</h3>
                                <table width="100%">
                                    <tr><td><strong>Nom :</strong></td><td>${firstName} ${lastName}</td></tr>
                                    <tr><td><strong>Tél :</strong></td><td><a href="tel:${phone}" style="color: #EAB308; text-decoration: none; font-weight: bold;">${phone}</a></td></tr>
                                    <tr><td><strong>Email :</strong></td><td>${email}</td></tr>
                                    <tr><td><strong>Adresse :</strong></td><td>${address}<br/>${postalCode} ${city}<br/>Maroc</td></tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 30px 20px 30px;">
                                <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 15px;">
                                    <table width="100%">
                                        <tr>
                                            <td width="50%">
                                                <p style="margin: 0; font-size: 11px; color: #6B7280;">PAIEMENT</p>
                                                <p style="margin: 5px 0 0 0; font-weight: bold;">${paymentMethod === 'cashOnDelivery' ? '💵 Cash à la livraison' : paymentMethod}</p>
                                            </td>
                                            <td width="50%">
                                                <p style="margin: 0; font-size: 11px; color: #6B7280;">LIVRAISON</p>
                                                <p style="margin: 5px 0 0 0; font-weight: bold;">${shippingMethod}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <table width="100%" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr style="background-color: #f9fafb;">
                                            <th align="left" style="padding: 8px; font-size: 11px; color: #6B7280;">PRODUIT</th>
                                            <th align="center" style="padding: 8px; font-size: 11px; color: #6B7280;">QTÉ</th>
                                            <th align="right" style="padding: 8px; font-size: 11px; color: #6B7280;">TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>${itemsHtml}</tbody>
                                    <tfoot>
                                        <tr><td colspan="2" align="right" style="padding-top: 15px;">Sous-total :</td><td align="right">${subtotal}</td></tr>
                                        <tr><td colspan="2" align="right">NET À PAYER :</td><td align="right" style="font-size: 18px; font-weight: bold; color: #EAB308;">${total}</td></tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="background-color: #1f2937; padding: 25px; text-align: center;">
                                <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: #fff; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; margin: 0 5px;">WhatsApp Client</a>
                                <a href="tel:${phone}" style="display: inline-block; background-color: #374151; color: #fff; padding: 12px 24px; border-radius: 6px; font-weight: bold; text-decoration: none; border: 1px solid #4B5563;">Appeler</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    const mailOptions = {
      from: `"Notification Commande" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      cc: email,
      replyTo: email,
      subject: `🔔 NOUVELLE COMMANDE: ${total} - ${firstName} ${lastName}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("ERREUR DANS L'API:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}