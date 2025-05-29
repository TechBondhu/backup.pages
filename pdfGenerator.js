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
        console.log("Step 5: Added NotoSerifBengali-Regular font to VFS");
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
        console.log("Step 7: Added NotoSerifBengali-Bold font to VFS");
        doc.addFont('NotoSerifBengali-Bold.ttf', 'NotoSerifBengali', 'bold');
        console.log("Step 8: Registered NotoSerifBengali-Bold font");

        doc.setFont('NotoSerifBengali', 'normal');
        console.log("Step 9: Default font set to NotoSerifBengali (normal)");

        // বাকি কোড (হেডার, টেমপ্লেট, টেবিল ইত্যাদি)
        console.log("Step 12: Designing header with gradient");
        doc.setFillColor(200, 220, 255); // গ্রেডিয়েন্ট রঙ
        doc.rect(10, 10, 190, 20, 'F'); // হেডার বক্স
        doc.setTextColor(0);
        doc.text(`তারিখ: ${new Date().toLocaleDateString('bn-BD')}`, 15, 20);
        console.log(`Step 13: Header text added with date: ${new Date().toLocaleDateString('bn-BD')}`);

        // লোগো এবং বর্ডার
        console.log("Step 14: No valid logoData provided or logoData does not start with 'data:image'");
        console.log("Step 16: Drawing page border");
        doc.setDrawColor(0);
        doc.rect(5, 5, 200, 287); // A4 পেজ বর্ডার
        console.log("Step 17: Page border drawn");

        // টেমপ্লেট সিলেকশন
        console.log("Step 18: Selected template: জাতীয় পরিচয়পত্র আবেদন ফর্ম for formType: nid");
        const templates = {
            nid: {
                title: 'জাতীয় পরিচয়পত্র আবেদন ফর্ম',
                sections: [
                    { section: 'ব্যক্তিগত তথ্য', fields: ['name', 'father_name'] },
                    { section: 'ঠিকানা', fields: ['address'] },
                    { section: 'জন্ম তারিখ', fields: ['dob'] },
                ],
                fields: {
                    name: 'নাম',
                    father_name: 'পিতার নাম',
                    address: 'বর্তমান ঠিকানা',
                    dob: 'জন্ম তারিখ'
                }
            }
        };

        const template = templates[formType] || templates['generic'];
        console.log("Step 19: Template fields updated:", Object.keys(template.fields));

        // টেমপ্লেট টাইটেল
        doc.setFont('NotoSerifBengali', 'bold');
        doc.setFontSize(16);
        doc.text(template.title, 105, 40, { align: 'center' });
        console.log(`Step 20: Template title added to PDF: ${template.title}`);

        // টেবিল লেআউট (আপডেটেড)
        let yPosition = 60;
        console.log(`Step 21: Starting table layout at y-position: ${yPosition}`);

        template.sections.forEach(sectionObj => {
            console.log(`Step 22: Processing section: ${sectionObj.section} with fields:`, sectionObj.fields);

            doc.setFont('NotoSerifBengali', 'bold');
            doc.setFontSize(12);
            yPosition += 10;
            doc.text(sectionObj.section, 15, yPosition + 5); // প্যাডিং
            console.log(`Step 23: Section heading added at y-position: ${yPosition}`);

            sectionObj.fields.forEach(field => {
                console.log(`Step 24: Processing field key: ${field} value: ${reviewData[field] || 'N/A'}`);
                const label = template.fields[field] || field;
                console.log(`Step 26: Generated label for field: ${label}`);

                doc.setFont('NotoSerifBengali', 'normal');
                doc.setFontSize(10);
                yPosition += 15; // বড় সারি উচ্চতা
                doc.rect(15, yPosition - 10, 180, 20); // বড় বক্স
                console.log(`Step 27: Drew table row at y-position: ${yPosition}`);
                doc.text(`${label}:`, 20, yPosition - 5); // প্যাডিং
                console.log(`Step 28: Added label text: ${label}:`);

                const value = reviewData[field] || 'N/A';
                const splitValue = doc.splitTextToSize(value, 120); // প্রস্থ কমিয়ে
                doc.setLineHeightFactor(1.5); // লাইন হাইট বাড়ানো
                doc.text(splitValue, 50, yPosition - 5); // পজিশন সামঞ্জস্য
                console.log(`Step 29: Added value text: ${value}`);
            });
            yPosition += 10; // বেশি ফাঁক
        });

        // PDF আউটপুট
        const pdfUrl = doc.output('datauristring');
        reviewCard.setAttribute('data-pdf-url', pdfUrl);
        console.log("Step 37: PDF URL set:", pdfUrl);

    } catch (error) {
        console.error("Step 10: Font loading error:", error.message || error);
        doc.setFont('helvetica'); // ফলব্যাক ফন্ট
        console.log("Step 11: Fallback font set to Helvetica");
        throw new Error("Font loading failed.");
    }
}
