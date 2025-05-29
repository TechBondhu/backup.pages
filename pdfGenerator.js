async function generatePDF(reviewData, reviewCard, formType = 'generic', logoData, qrCodeData) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    console.log("Step 3: jsPDF document initialized with portrait orientation, A4 format");

    try {
        console.log("Step 4: Attempting to load NotoSerifBengali fonts");

        // GitHub থেকে Raw ফন্ট ফাইলের URL
        const regularFontUrl = 'https://raw.githubusercontent.com/TechBondhu/backup.pages/main/fonts/NotoSerifBengali-Regular.ttf';
        const boldFontUrl = 'https://raw.githubusercontent.com/TechBondhu/backup.pages/main/fonts/NotoSerifBengali-Bold.ttf';

        // Regular ফন্ট লোড
        const regularResponse = await fetch(regularFontUrl);
        if (!regularResponse.ok) throw new Error(`Failed to fetch regular font: ${regularFontUrl}`);
        const regularArrayBuffer = await regularResponse.arrayBuffer();
        const regularBase64 = btoa(
            new Uint8Array(regularArrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        doc.addFileToVFS('NotoSerifBengali-Regular.ttf', regularBase64);
        doc.addFont('NotoSerifBengali-Regular.ttf', 'NotoSerifBengali', 'normal');
        console.log("Step 6: Registered NotoSerifBengali-Regular font");

        // Bold ফন্ট লোড
        const boldResponse = await fetch(boldFontUrl);
        if (!boldResponse.ok) throw new Error(`Failed to fetch bold font: ${boldFontUrl}`);
        const boldArrayBuffer = await boldResponse.arrayBuffer();
        const boldBase64 = btoa(
            new Uint8Array(boldArrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        doc.addFileToVFS('NotoSerifBengali-Bold.ttf', boldBase64);
        doc.addFont('NotoSerifBengali-Bold.ttf', 'NotoSerifBengali', 'bold');
        console.log("Step 8: Registered NotoSerifBengali-Bold font");

        doc.setFont('NotoSerifBengali', 'normal');
        console.log("Step 9: Default font set to NotoSerifBengali (normal)");

        // Header
        doc.setFillColor(200, 220, 255);
        doc.rect(10, 10, 190, 20, 'F');
        doc.setTextColor(0);
        doc.setFontSize(12);
        doc.text(`তারিখ: ${new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 15, 20);
        console.log(`Step 13: Header text added with date`);

        // Border
        doc.setDrawColor(0);
        doc.rect(5, 5, 200, 287);
        console.log("Step 17: Page border drawn");

        // Template selection
        console.log("Step 18: Selected template for formType:", formType);
        const templates = {
            nid: {
                title: 'জাতীয় পরিচয়পত্র আবেদন ফর্ম',
                sections: [
                    { section: 'ব্যক্তিগত তথ্য', fields: ['name', 'father_name', 'mother_name'] },
                    { section: 'ঠিকানা', fields: ['address'] },
                    { section: 'জন্ম তারিখ', fields: ['date_of_birth'] },
                ],
                fields: {
                    name: 'নাম',
                    father_name: 'পিতার নাম',
                    mother_name: 'মাতার নাম',
                    address: 'বর্তমান ঠিকানা',
                    date_of_birth: 'জন্ম তারিখ'
                }
            },
            generic: {
                title: 'জেনেরিক ফর্ম',
                sections: [
                    { section: 'ব্যক্তিগত তথ্য', fields: ['name', 'father_name'] },
                ],
                fields: {
                    name: 'নাম',
                    father_name: 'পিতার নাম'
                }
            }
        };

        const template = templates[formType] || templates['nid'];
        console.log("Step 19: Template fields updated:", Object.keys(template.fields));

        // Title
        doc.setFont('NotoSerifBengali', 'bold');
        doc.setFontSize(16);
        doc.text(template.title, 105, 40, { align: 'center' });
        console.log(`Step 20: Template title added to PDF: ${template.title}`);

        // Table layout
        let yPosition = 60;
        console.log(`Step 21: Starting table layout at y-position: ${yPosition}`);

        template.sections.forEach(sectionObj => {
            console.log(`Step 22: Processing section: ${sectionObj.section} with fields:`, sectionObj.fields);

            doc.setFont('NotoSerifBengali', 'bold');
            doc.setFontSize(12);
            yPosition += 10;
            doc.text(sectionObj.section, 15, yPosition + 5);
            console.log(`Step 23: Section heading added at y-position: ${yPosition}`);

            sectionObj.fields.forEach(field => {
                console.log(`Step 24: Processing field key: ${field} value: ${reviewData[field] || 'N/A'}`);
                const label = template.fields[field] || field;
                console.log(`Step 26: Generated label for field: ${label}`);

                doc.setFont('NotoSerifBengali', 'normal');
                doc.setFontSize(10);
                yPosition += 15;
                doc.rect(15, yPosition - 10, 170, 20); // প্রস্থ কমিয়ে
                console.log(`Step 27: Drew table row at y-position: ${yPosition}`);
                doc.text(`${label}:`, 20, yPosition - 5);
                console.log(`Step 28: Added label text: ${label}:`);

                const value = reviewData[field] || 'N/A';
                const splitValue = doc.splitTextToSize(value, 100); // প্রস্থ আরও কমিয়ে
                doc.setLineHeightFactor(1.8); // লাইন হাইট বাড়ানো
                let textY = yPosition - 5;
                splitValue.forEach(line => {
                    doc.text(line, 50, textY);
                    textY += 6; // লাইনের মধ্যে ফাঁক
                });
                console.log(`Step 29: Added value text: ${value}`);
            });
            yPosition += 10;
        });

        // PDF output
        const pdfUrl = doc.output('datauristring');
        reviewCard.setAttribute('data-pdf-url', pdfUrl);
        console.log("Step 37: PDF URL set:", pdfUrl);

    } catch (error) {
        console.error("Step 10: Font loading error:", error.message || error);
        doc.setFont('helvetica');
        console.log("Step 11: Fallback font set to Helvetica");
        throw new Error("Font loading failed.");
    }
}
