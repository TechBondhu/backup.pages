// ফর্ম টেমপ্লেট (ফর্ম টাইপের উপর ভিত্তি করে)
const formTemplates = {
    nid: {
        title: 'জাতীয় পরিচয়পত্র আবেদন ফর্ম',
        fields: ['name', 'father_name', 'addrress', 'date_of_birth'],
        layout: {
            labelWidth: 60,
            valueWidth: 110,
            sections: ['ব্যক্তিগত তথ্য', 'ডকুমেন্ট']
        },
        sectionFields: {
            'ব্যক্তিগত তথ্য': ['name', 'father_name', 'mother_name'],
            'ডকুমেন্ট': ['nid_number']
        }
    },
    passport: {
        title: 'পাসপোর্ট আবেদন ফর্ম',
        fields: ['name', 'passport_number', 'issue_date'],
        layout: {
            labelWidth: 60,
            valueWidth: 110,
            sections: ['ব্যক্তিগত তথ্য', 'পাসপোর্ট তথ্য']
        },
        sectionFields: {
            'ব্যক্তিগত তথ্য': ['name'],
            'পাসপোর্ট তথ্য': ['passport_number', 'issue_date']
        }
    },
    university: {
        title: 'বিশ্ববিদ্যালয় ভর্তি আবেদন ফর্ম',
        fields: ['name', 'roll_number', 'exam_name'],
        layout: {
            labelWidth: 60,
            valueWidth: 110,
            sections: ['ব্যক্তিগত তথ্য', 'পরীক্ষা তথ্য']
        },
        sectionFields: {
            'ব্যক্তিগত তথ্য': ['name'],
            'পরীক্ষা তথ্য': ['roll_number', 'exam_name']
        }
    },
    generic: {
        title: 'সাধারণ আবেদন ফর্ম',
        fields: [],
        layout: {
            labelWidth: 60,
            valueWidth: 110,
            sections: ['সাধারণ তথ্য']
        },
        sectionFields: {
            'সাধারণ তথ্য': []
        }
    }
};

const notoSerifBengaliBase64 = 'AAEAAAAQAQAABAAAR0RFRlpFVYcAAAI8AAABpkdQT...'; // তোমার Base64 স্ট্রিং

function generatePDF(reviewData, reviewCard, formType = 'generic', logoData, qrCodeData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // বাংলা ফন্ট লোড (Noto Serif Bengali)
    const notoSerifBengali = 'data:font/ttf;base64,' + notoSerifBengaliBase64;
    doc.addFileToVFS('NotoSerifBengali-Regular.ttf', notoSerifBengali);
    doc.addFont('NotoSerifBengali-Regular.ttf', 'NotoSerifBengali', 'normal');
    doc.setFont('NotoSerifBengali');

    // হেডার ডিজাইন (গ্রেডিয়েন্ট)
    doc.setFillColor(33, 150, 243); // প্রাথমিক নীল
    doc.rect(0, 0, 210, 20, 'F');
    doc.setFillColor(66, 165, 245); // হালকা নীল
    doc.rect(0, 20, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('Formbondhu Submission', 20, 15);
    doc.setFontSize(12);
    doc.text(`তারিখ: ${new Date().toLocaleDateString('bn-BD')}`, 20, 30);
    doc.text('www.formbondhu.com', 160, 30);
    doc.text('হটলাইন: +880123456789', 160, 20);
    if (logoData && logoData.startsWith('data:image')) {
        doc.addImage(logoData, 'PNG', 20, 5, 30, 30);
    }

    // বর্ডার
    doc.setDrawColor(33, 150, 243);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // টেমপ্লেট ডিজাইন
    const template = formTemplates[formType] || formTemplates.generic;
    template.fields = template.fields.length ? template.fields : Object.keys(reviewData); // ডায়নামিক ফিল্ড
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(template.title, 20, 50);

    // টেবিল-ভিত্তিক ফর্ম লেআউট
    let y = 60;
    doc.setFontSize(12);
    doc.setLineWidth(0.2);
    doc.setDrawColor(150, 150, 150);

    for (let s = 0; s < template.layout.sections.length; s++) {
        const section = template.layout.sections[s];
        const sectionFields = template.sectionFields[section] || [];

        if (sectionFields.length > 0) {
            // সেকশন হেডিং
            doc.setFont('NotoSerifBengali', 'bold');
            doc.setTextColor(33, 150, 243);
            doc.text(section, 20, y);
            y += 10;

            // সেকশনের ফিল্ডগুলো প্রিন্ট
            for (const key of sectionFields) {
                const value = reviewData[key];
                if (value === undefined) continue;

                const label = key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
                doc.setFillColor(220, 240, 255);
                doc.rect(20, y, 60, 10, 'F');
                doc.setFillColor(245, 245, 245);
                doc.rect(80, y, 110, 10, 'F');
                doc.rect(20, y, 170, 10);

                doc.setTextColor(0, 0, 0);
                doc.setFont('NotoSerifBengali', 'bold');
                doc.text(`${label}:`, 22, y + 7);

                if (typeof value === 'string') {
                    doc.setFont('NotoSerifBengali', 'normal');
                    const lines = doc.splitTextToSize(value, 105);
                    doc.text(lines, 82, y + 7);
                    y += Math.max(lines.length * 7, 10);
                }
            }
        }
    }

    // ফুটার (গ্রেডিয়েন্ট)
    doc.setFillColor(66, 165, 245); // হালকা নীল
    doc.rect(0, 277, 210, 10, 'F');
    doc.setFillColor(33, 150, 243); // প্রাথমিক নীল
    doc.rect(0, 287, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('NotoSerifBengali');
    doc.text('ফর্মবন্ধু দ্বারা তৈরি - www.formbondhu.com', 20, 285);
    doc.text('পৃষ্ঠা ১ এর ১', 180, 285);
    if (qrCodeData && qrCodeData.startsWith('data:image')) {
        doc.addImage(qrCodeData, 'PNG', 170, 278, 30, 18);
    }

    // PDF আউটপুট
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    reviewCard.setAttribute('data-pdf-url', pdfUrl);
}
