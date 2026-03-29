
// الفرق بين encryption و hashing 

// encryption هو عبارة عن عملية تحويل البيانات الى صيغة غير مفهومة و يمكن استرجاعها مرة اخرى باستخدام مفتاح معين

// hashing هو عبارة عن عملية تحويل البيانات الى صيغة غير مفهومة و لا يمكن استرجاعها مرة اخرى و يتم استخدامه لتخزين كلمات المرور في قواعد البيانات

// async handler هو عبارة عن function بتاخد controller و بترجع function تانية بتاخد req, res, next و بتنفذ ال controller و لو حصل اى error بيتم التقاطه و تمريره لل global error handler

/*
الفرق بين ال not found و ال global error handler

ال not found هو عبارة عن middleware بيتم تنفيذه لما ال client يطلب endpoint غير موجود و بيرد عليه برسالة بتقول ان الصفحة غير موجودة 
ال global error handler هو عبارة عن middleware بيتم تنفيذه لما يحصل اى error فى ال controller و بيرد عليه برسالة بتقول ان حصل خطأ و بيحتوى على ال error message و ال error stack
*/ 

