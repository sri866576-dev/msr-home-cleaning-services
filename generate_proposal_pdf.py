import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def build_pdf():
    pdf_filename = "MSR_Home_Cleaning_Proposal.pdf"
    
    # 1. Setup Document
    # A4/Letter size. Let's use standard margins (0.5 inch / 36 points for more printable area)
    margin = 36
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    # 2. Style Sheet
    styles = getSampleStyleSheet()
    
    # Colors
    color_primary = colors.HexColor("#0A369D")
    color_primary_dark = colors.HexColor("#001C55")
    color_primary_light = colors.HexColor("#4A7BEC")
    color_accent = colors.HexColor("#E2B23C")
    color_text = colors.HexColor("#1E293B")
    color_muted = colors.HexColor("#64748B")
    color_bg_light = colors.HexColor("#F8FAFC")
    color_border = colors.HexColor("#E2E8F0")
    
    # Custom Paragraph Styles
    style_normal = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=color_text,
        leading=14
    )
    
    style_bold = ParagraphStyle(
        'CustomBold',
        parent=style_normal,
        fontName='Helvetica-Bold'
    )
    
    style_muted = ParagraphStyle(
        'CustomMuted',
        parent=style_normal,
        textColor=color_muted,
        fontSize=9,
        leading=12
    )
    
    style_h1 = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        textColor=color_primary_dark,
        leading=26,
        spaceAfter=6
    )
    
    style_h2 = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        textColor=color_primary,
        leading=16,
        spaceAfter=8,
        spaceBefore=12
    )
    
    style_brand_title = ParagraphStyle(
        'BrandTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        textColor=color_primary_dark,
        leading=20
    )
    
    style_brand_subtitle = ParagraphStyle(
        'BrandSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        textColor=color_primary_light,
        leading=11
    )
    
    style_doc_tag = ParagraphStyle(
        'DocTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        textColor=color_primary,
        leading=11
    )
    
    style_meta_label = ParagraphStyle(
        'MetaLabel',
        parent=style_normal,
        fontName='Helvetica-Bold',
        fontSize=9,
        textColor=color_text
    )
    
    style_meta_value = ParagraphStyle(
        'MetaValue',
        parent=style_normal,
        fontSize=9,
        textColor=color_muted
    )

    style_card_title = ParagraphStyle(
        'CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        textColor=color_primary,
        leading=12,
        spaceAfter=6
    )

    style_card_content = ParagraphStyle(
        'CardContent',
        parent=style_normal,
        fontSize=9,
        leading=13
    )

    style_service_title = ParagraphStyle(
        'ServiceTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=color_primary_dark,
        leading=14
    )

    style_service_desc = ParagraphStyle(
        'ServiceDesc',
        parent=style_normal,
        fontSize=9,
        textColor=color_muted,
        leading=12
    )

    style_service_bullets = ParagraphStyle(
        'ServiceBullets',
        parent=style_normal,
        fontSize=8.5,
        textColor=color_text,
        leading=11
    )

    style_service_tag = ParagraphStyle(
        'ServiceTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        textColor=color_primary_light,
        leading=10,
        spaceAfter=4
    )
    
    style_fin_label = ParagraphStyle(
        'FinLabel',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.white,
        leading=14
    )
    
    style_fin_value = ParagraphStyle(
        'FinValue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.white,
        alignment=2, # Right align
        leading=14
    )

    style_fin_discount = ParagraphStyle(
        'FinDiscount',
        parent=style_fin_label,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#F7D070")
    )

    style_fin_discount_val = ParagraphStyle(
        'FinDiscountVal',
        parent=style_fin_value,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#F7D070")
    )
    
    style_fin_total_label = ParagraphStyle(
        'FinTotalLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        textColor=colors.white,
        leading=16
    )
    
    style_fin_total_amount = ParagraphStyle(
        'FinTotalAmount',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        textColor=color_accent,
        alignment=2, # Right align
        leading=20
    )

    story = []
    
    # ----------------------------------------------------
    # HEADER SECTION
    # ----------------------------------------------------
    logo_path = "Blue Cleaning Services Logo_dark-blue.png"
    logo_w = 40
    logo_h = 40
    
    # Prepare Left Cell: Logo + Brand
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=logo_w, height=logo_h)
        logo_img.hAlign = 'LEFT'
        
        # Table of Logo and Title side by side
        title_p1 = Paragraph("Mr. MSR", style_brand_title)
        title_p2 = Paragraph("Home Cleaning Services", style_brand_subtitle)
        brand_cell = Table([[logo_img, [title_p1, title_p2]]], colWidths=[45, 200])
        brand_cell.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
    else:
        # Fallback text logo
        title_p1 = Paragraph("Mr. MSR", style_brand_title)
        title_p2 = Paragraph("Home Cleaning Services", style_brand_subtitle)
        brand_cell = [title_p1, title_p2]

    # Prepare Right Cell: Meta Title & Info
    tag_p = Paragraph("PROJECT PROPOSAL & INVOICE", style_doc_tag)
    meta_p = Paragraph(
        "<b>Proposal ID:</b> MSR-2026-001<br/>"
        "<b>Date:</b> May 25, 2026<br/>"
        "<b>Valid Until:</b> June 25, 2026",
        style_muted
    )
    
    header_table = Table([[brand_cell, [tag_p, meta_p]]], colWidths=[doc.width * 0.55, doc.width * 0.45])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (1,0), (1,0), 'RIGHT'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    
    story.append(header_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=color_border, spaceBefore=5, spaceAfter=20))
    
    # ----------------------------------------------------
    # CLIENT / PREPARED BY SECTION
    # ----------------------------------------------------
    client_info = [
        Paragraph("CLIENT INFORMATION", style_card_title),
        Paragraph("<b>MSR Home Cleaning Services</b>", style_bold),
        Paragraph("Contact: Service Provider Owner", style_card_content),
        Paragraph("Location: Jillelaguda, Hyderabad, TS, 500097", style_card_content),
        Paragraph("Service Areas: Jubilee Hills, Gachibowli, Madhapur, etc.", style_card_content)
    ]
    
    prepared_by = [
        Paragraph("PREPARED BY", style_card_title),
        Paragraph("<b>Web Development & Automation Team</b>", style_bold),
        Paragraph("Email: sri866576@gmail.com", style_card_content),
        Paragraph("Format: Fully Automated Web App", style_card_content),
        Paragraph("Tech Stack: HTML, CSS, JS, Apps Script, Sheets API", style_card_content)
    ]
    
    parties_table = Table([[client_info, prepared_by]], colWidths=[doc.width * 0.48, doc.width * 0.48])
    parties_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), color_bg_light),
        ('BACKGROUND', (1,0), (1,0), color_bg_light),
        ('BOX', (0,0), (0,0), 1, color_border),
        ('BOX', (1,0), (1,0), 1, color_border),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
    ]))
    
    story.append(parties_table)
    story.append(Spacer(1, 20))
    
    # ----------------------------------------------------
    # SCOPE OF WORK SECTION
    # ----------------------------------------------------
    story.append(Paragraph("SCOPE OF WORK & DELIVERABLES", style_h2))
    story.append(Spacer(1, 6))
    
    # Deliverable 1
    d1_details = [
        Paragraph("USER INTERFACE DESIGN", style_service_tag),
        Paragraph("Premium & Responsive UI Landing Pages", style_service_title),
        Paragraph("Conversion-optimized landing page structure tailored specifically for cleaning service lead acquisition in Hyderabad.", style_service_desc),
        Paragraph("• Fully responsive mobile-first architecture matching modern guidelines<br/>"
                  "• Custom dark blue aesthetic theme utilizing modern typography<br/>"
                  "• 12+ detailed category cards linking to instant callbacks<br/>"
                  "• High-engagement quick-action Call & WhatsApp floating elements", style_service_bullets)
    ]
    d1_price = Paragraph("<b>₹4,000</b><br/><font color='#64748B' size='8'>Design & Dev</font>", style_bold)
    d1_price.alignment = 2
    
    # Deliverable 2
    d2_details = [
        Paragraph("DATABASE & SPREADSHEET INTEGRATION", style_service_tag),
        Paragraph("Google Sheets Live Lead Database Integration", style_service_title),
        Paragraph("Direct front-end to back-end pipeline saving prospect queries in real-time, completely bypassing hosting overheads.", style_service_desc),
        Paragraph("• Google Apps Script (Code.gs) secure connection rules<br/>"
                  "• Custom database columns (Timestamp, Name, Phone, Service, Source)<br/>"
                  "• Fast JSON post handler with callback routing<br/>"
                  "• Complete environment variables configuration for scalability", style_service_bullets)
    ]
    d2_price = Paragraph("<b>₹1,500</b><br/><font color='#64748B' size='8'>API Integration</font>", style_bold)
    d2_price.alignment = 2
    
    # Deliverable 3
    d3_details = [
        Paragraph("AUTOMATION & ALERTS", style_service_tag),
        Paragraph("Instant Admin Email Notifications & Messages", style_service_title),
        Paragraph("Custom triggers instantly notifying project administrators via email matching lead entry updates in the spreadsheet database.", style_service_desc),
        Paragraph("• Dual email broadcast rules (sumithnalla24@ifheindia.org & sri866576@gmail.com)<br/>"
                  "• Rich-text professional HTML email alert layout with service markers<br/>"
                  "• Instant subject formatting with lead name and requested service<br/>"
                  "• Automated contact form triggers redirecting customers to direct WhatsApp chats", style_service_bullets)
    ]
    d3_price = Paragraph("<b>₹2,000</b><br/><font color='#64748B' size='8'>Automations</font>", style_bold)
    d3_price.alignment = 2
    
    deliv_table = Table(
        [
            [d1_details, d1_price],
            [d2_details, d2_price],
            [d3_details, d3_price]
        ],
        colWidths=[doc.width * 0.76, doc.width * 0.20]
    )
    
    deliv_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, color_border),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    
    story.append(deliv_table)
    story.append(Spacer(1, 20))
    
    # ----------------------------------------------------
    # FINANCIAL SUMMARY
    # ----------------------------------------------------
    story.append(Paragraph("PRICING & INVESTMENT SUMMARY", style_h2))
    story.append(Spacer(1, 6))
    
    fin_data = [
        [Paragraph("Project Subtotal (₹4,000 + ₹1,500 + ₹2,000)", style_fin_label), Paragraph("₹7,500.00", style_fin_value)],
        [Paragraph("Special Introductory Discount (15% OFF)", style_fin_discount), Paragraph("- ₹1,125.00", style_fin_discount_val)],
        [Paragraph("Total Net Investment Payable", style_fin_total_label), Paragraph("₹6,375.00 INR", style_fin_total_amount)]
    ]
    
    fin_table = Table(fin_data, colWidths=[doc.width * 0.65, doc.width * 0.31])
    fin_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), color_primary_dark),
        ('BOX', (0,0), (-1,-1), 1, color_primary_dark),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, colors.HexColor("#0D2C73")),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 15),
        ('RIGHTPADDING', (0,0), (-1,-1), 15),
        ('TOPPADDING', (0,2), (1,2), 14),
        ('BOTTOMPADDING', (0,2), (1,2), 14),
    ]))
    
    story.append(fin_table)
    story.append(Spacer(1, 20))
    
    # ----------------------------------------------------
    # TERMS AND SIGNATURES
    # ----------------------------------------------------
    story.append(Paragraph("TERMS & CONDITIONS", style_h2))
    story.append(Spacer(1, 4))
    
    terms_p = Paragraph(
        "• <b>Full Deliverables Included:</b> High-converting UI landing pages, operational Google Sheets integration, and administrative email notifications as specified in <font color='#0A369D'>GOOGLE_SHEETS_SETUP_COMPLETE.md</font>.<br/>"
        "• <b>Platform Cost:</b> Runs entirely on Google Apps Script and Gmail APIs with ₹0 platform hosting/subscription costs.<br/>"
        "• <b>Payment:</b> Net project fee of <b>₹6,375.00 INR</b> to be disbursed upon final hand-over and synchronization tests.",
        style_normal
    )
    story.append(terms_p)
    story.append(Spacer(1, 30))
    
    # Signature fields
    sig_client = [
        Spacer(1, 25),
        HRFlowable(width="90%", thickness=1, color=color_muted, hAlign='CENTER'),
        Spacer(1, 4),
        Paragraph("<b>Mr. MSR / Client Owner</b>", style_bold),
        Paragraph("MSR Home Cleaning Services", style_muted)
    ]
    sig_client[3].alignment = 1
    sig_client[4].alignment = 1
    
    sig_dev = [
        Spacer(1, 25),
        HRFlowable(width="90%", thickness=1, color=color_muted, hAlign='CENTER'),
        Spacer(1, 4),
        Paragraph("<b>Lead Developer & Automator</b>", style_bold),
        Paragraph("Web Development Team", style_muted)
    ]
    sig_dev[3].alignment = 1
    sig_dev[4].alignment = 1
    
    sig_table = Table([[sig_client, sig_dev]], colWidths=[doc.width * 0.48, doc.width * 0.48])
    sig_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    
    story.append(sig_table)
    
    # 3. Build PDF
    doc.build(story)
    print(f"Successfully generated {pdf_filename}")

if __name__ == "__main__":
    build_pdf()
