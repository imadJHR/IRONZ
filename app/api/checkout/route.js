import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return NextResponse.json(
                { success: false, message: "Configuration serveur incomplète" },
                { status: 500 }
            );
        }
        const {
            orderNumber,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            country,
            paymentMethod,
            shippingMethod,
            notes,
            items,
            subtotal,
            total,
        } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // --- PRÉPARATION DES DONNÉES ---

        // Nettoyage du numéro de téléphone pour le lien WhatsApp (enlève les espaces et tirets)
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        const whatsappLink = `https://wa.me/${cleanPhone.startsWith('0') ? cleanPhone.replace('0', '212') : cleanPhone}`;

        // Date et Heure
        const now = new Date();
        const dateFormatted = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        const timeFormatted = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        // Génération des lignes produits
        const itemsHtml = items
            .map(
                (item) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0;">
                <div style="font-weight: bold; color: #111; font-size: 14px;">${item.name}</div>
                <div style="color: #6b7280; font-size: 12px;">
                    ${item.selectedTaille ? `Taille: <strong>${item.selectedTaille}</strong>` : ""} 
                    ${item.selectedColor ? ` | Couleur: <strong>${item.selectedColor}</strong>` : ""}
                </div>
            </td>
            <td style="padding: 12px 0; text-align: center; color: #111; font-weight: bold;">x ${item.quantity}</td>
            <td style="padding: 12px 0; text-align: right; color: #111;">${new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(item.price)}</td>
        </tr>`
            )
            .join("");

        // --- TEMPLATE HTML (Optimisé pour le Vendeur) ---
        const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouvelle Commande</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 20px 0;">
            <tr>
                <td align="center">
                    
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header : NOIR & JAUNE -->
                        <tr>
                            <td style="background-color: #111827; padding: 25px; text-align: center; border-bottom: 4px solid #EAB308;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">
                                    Nouvelle Commande
                                </h1>
                                <p style="color: #EAB308; margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${total}</p>
                                <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 12px;"> ${dateFormatted} à ${timeFormatted}</p>
                            </td>
                        </tr>

                        <!-- Section Client (Mise en avant pour contact rapide) -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h3 style="color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">👤 Informations Client</h3>
                                
                                <div style="display: flex; justify-content: space-between;">
                                    <table width="100%">
                                        <tr>
                                            <td style="padding-bottom: 5px;"><strong>Nom :</strong></td>
                                            <td style="padding-bottom: 5px;">${firstName} ${lastName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 5px;"><strong>Tél :</strong></td>
                                            <td style="padding-bottom: 5px;"><a href="tel:${phone}" style="color: #EAB308; text-decoration: none; font-weight: bold;">${phone}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 5px;"><strong>Email :</strong></td>
                                            <td style="padding-bottom: 5px;"><a href="mailto:${email}" style="color: #374151; text-decoration: none;">${email}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 5px; vertical-align: top;"><strong>Adresse :</strong></td>
                                            <td style="padding-bottom: 5px;">${address}<br/>${postalCode} ${city}<br/>Maroc</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- Section Paiement & Livraison -->
                        <tr>
                            <td style="padding: 0 30px 20px 30px;">
                                <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 15px;">
                                    <table width="100%">
                                        <tr>
                                            <td width="50%" valign="top">
                                                <p style="margin: 0; font-size: 11px; color: #6B7280; text-transform: uppercase;">Méthode de Paiement</p>
                                                <p style="margin: 5px 0 0 0; font-weight: bold; color: #111;">
                                                    ${paymentMethod === 'cashOnDelivery' ? '💵 Paiement à la livraison' : paymentMethod}
                                                </p>
                                            </td>
                                            <td width="50%" valign="top">
                                                <p style="margin: 0; font-size: 11px; color: #6B7280; text-transform: uppercase;">Livraison</p>
                                                <p style="margin: 5px 0 0 0; font-weight: bold; color: #111;">${shippingMethod}</p>
                                            </td>
                                        </tr>
                                        ${notes ? `
                                        <tr>
                                            <td colspan="2" style="padding-top: 15px;">
                                                <p style="margin: 0; font-size: 11px; color: #D97706; text-transform: uppercase; font-weight: bold;">⚠️ Note du client :</p>
                                                <p style="margin: 5px 0 0 0; font-style: italic; color: #374151; background-color: #fffbeb; padding: 8px; border-radius: 4px;">"${notes}"</p>
                                            </td>
                                        </tr>` : ''}
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <!-- Section Produits -->
                        <tr>
                            <td style="padding: 0 30px 30px 30px;">
                                <h3 style="color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; border-bottom: 1px solid #eee; padding-bottom: 5px;">🛒 Contenu de la commande</h3>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <thead>
                                        <tr style="background-color: #f9fafb;">
                                            <th align="left" style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #6B7280;">Produit</th>
                                            <th align="center" style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #6B7280;">Qté</th>
                                            <th align="right" style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #6B7280;">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${itemsHtml}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="2" align="right" style="padding-top: 15px; color: #6B7280;">Sous-total :</td>
                                            <td align="right" style="padding-top: 15px; color: #111;">${subtotal}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right" style="padding-top: 5px; color: #6B7280;">Livraison :</td>
                                            <td align="right" style="padding-top: 5px; color: #111;">${shippingMethod === 'standard' && parseFloat(subtotal) >= 500 ? 'GRATUIT' : (shippingMethod === 'standard' ? '30.00 MAD' : '0 MAD')}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" align="right" style="padding-top: 10px; font-size: 16px; font-weight: bold; color: #000;">NET À PAYER :</td>
                                            <td align="right" style="padding-top: 10px; font-size: 18px; font-weight: bold; color: #EAB308;">${total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>

                        <!-- Section Actions Rapides (Pour le vendeur) -->
                        <tr>
                            <td style="background-color: #1f2937; padding: 25px; text-align: center;">
                                <p style="color: #9CA3AF; font-size: 12px; margin-bottom: 15px; text-transform: uppercase;">Actions Rapides</p>
                                
                                <!-- Bouton WhatsApp vers le client -->
                                <a href="${whatsappLink}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 0 5px;">
                                    💬 WhatsApp Client
                                </a>

                                <!-- Bouton Appeler le client -->
                                <a href="tel:${phone}" style="display: inline-block; background-color: #374151; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 0 5px; border: 1px solid #4B5563;">
                                    📞 Appeler
                                </a>
                            </td>
                        </tr>

                    </table>
                    
                    <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 20px;">
                        Email généré automatiquement par votre site web.
                    </p>

                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

        const mailOptions = {
            from: `"Notification Commande" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO, // L'email du vendeur (VOUS)
            cc: email, // Le client reçoit une copie (optionnel, enlevez cette ligne si vous voulez recevoir l'email SEULEMENT pour vous)
            replyTo: email, // IMPORTANT: Si vous cliquez sur répondre, ça écrit au client
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