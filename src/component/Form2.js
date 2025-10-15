import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../AppStyles.css";

export default function Form2() {
  const [step, setStep] = useState(0);
  const [traineeName, setTraineeName] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [trainingCenter, setTrainingCenter] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [answers, setAnswers] = useState([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const professions = [
    "إدارة تزويد مأمور","التمديدات الصحية","تكييف وتبريد","حداد ألمنيوم","حداد فاصلون",
    "دهان اثاث خشبي","دهان مباني / مجهز ديكورات جبسية","فني آلات صناعية","قصير , مركب قواطع جبس",
    "كهربائي تمديدات منزلي وتحكم","كهربائي سيارات","لحام أنابيب","مركب خلايا طاقة شمسية",
    "نجار أثاث","نجار طوبار , حداد تسليح","خياط نسائي","حلاق نسائي","بستنة عامة",
    "خضراوات محمية","تسويق الكتروني","ميكانيك مركبات خفيفة"
  ];

  const trainingCenters = [
    "الحسينية","معهد الجفر","معهد الرمثا","معهد الريشة","معهد الزرقاء","معهد الطفيلة",
    "معهد العقبة","معهد الكرك","معهد الكورة","معهد الموقر","معهد جرش","معهد ذيبان",
    "معهد عجلون","معهد مادبا","معهد ماركا","معهد معان","معهد السرحان",
    "العقبه/القويرة","رحاب","الصفاوي","مركز العقبة (HUB)","الرويشد","مشغل قرا بني هاشم"
  ];

  const questions = [
    { question: "تتطور مهاراتي في المهنة بشكل مستمر خلال مرحلة التدريب المهني؟ تقييم ذاتي للمتدرب", options: ["نعم","لا","أحياناً"] },
    { question: "اقوم بكافة التمارين العملية بنفسي في حصة التدريب العملي؟ تقييم ذاتي للمتدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "استطيع العمل في مهنتي بعد مرحلة التدريب في سوق العمل؟ تقييم ذاتي للمتدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "ارتدي كافة معدات السلامة المهنة التي تخص مهنتي اثناء التدريب العملي؟ تقييم ذاتي للمتدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "هل تعرف ماهي الشهادة التي ستمنح لك بعد نجاحك بالبرنامج التدريبي؟ تقييم ذاتي للمتدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "المعلومات النظرية واضحة في المنهاج ويسهل الرجوع اليها؟ تقييم المنهاج التدريبي", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "التمارين العملية واضحة ويسهل تطبيقها اثناء التدريب العملي؟ تقييم المنهاج التدريبي", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "البرنامج التدريبي يؤهل المتدرب للعمل في سوق العمل؟ تقييم المنهاج التدريبي", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "البرنامج التدريبي ينمي العمل بروح الفريق؟ تقييم المنهاج التدريبي", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "البرنامج التدريبي يدرب على مهن ملائمة بما هو مطلوب في سوق العمل؟ تقييم المنهاج التدريبي", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "المدرب متمكن من المهنة التي يدرب عليها؟ تقييم المدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتجاوب المدرب مع المتدربين ويجيب على أسئلتهم؟ تقييم المدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتم اعداد بطاقة التمرين العملي لكل تمرين من قبل المدرب؟ تقييم المدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتعامل المدرب باحترام مع جميع المتدربين؟ تقييم المدرب", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتوفر في القاعات ادوات التدريب اللازمة للتطبيق العملي بالماده المشروحة؟ تقييم البيئة التدريبية", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتوفر في القاعات ادوات التدريب اللازمة لشرح المادة النظرية؟ تقييم البيئة التدريبية", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "حجم القاعات الصفية يتناسب مع عدد المتدربين؟ تقييم البيئة التدريبية", options: ["ضعيف","جيد","جيد جدا","ممتاز"] },
    { question: "يتم تقييد بارتداء معدات السلامة المهنية التي تخص مهنتك أثناء التدريب العملي؟ تقييم البيئة التدريبية", options: ["ضعيف","جيد","جيد جدا","ممتاز"] }
  ];

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const data = {
    traineeName,
      selectedProfession,
      trainingCenter,
      evaluation,
      answers: answers.map((a,i) => ({ question: questions[i].question, answer: a })),
      date: new Date().toLocaleString("ar-EG"),
    };
      const existingData = JSON.parse(localStorage.getItem("form2Submissions") || "[]");
    existingData.push(data);
    localStorage.setItem("form2Submissions", JSON.stringify(existingData));

    setSubmitted(true);
  };
    

  const totalSteps = 1 + 1 + questions.length + 1; 
  const progress = ((step) / totalSteps) * 100;

  return (
    <div className="form-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <AnimatePresence exitBeforeEnter>
        {submitted ? (
          <motion.div 
            key="thankyou"
            className="thank-you-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
          >
            <h2>شكرًا لك على إكمال الاستبيان!</h2>
            <p>تم تسجيل إجاباتك بنجاح وسيتم تحميل الملف.</p>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            onSubmit={handleSubmit}
            className="training-form animated-step"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <img src="https://tse4.mm.bing.net/th/id/OIP.HEil-u4k_qmvxrr4fbu2OAAAAA?pid=Api&P=0&h=220" alt="Logo"/>

            {step === 0 && (
              <div className="welcome-screen">
                <h2>مرحبًا بك في استبيان رضا المتدرب</h2>
                <p>اضغط على التالي للبدء</p>
                <button type="button" className="red-btn start-btn" onClick={handleNext}>التالي</button>
              </div>
            )}

            {step === 1 && (
              <div className="card">
                <label>اسم المتدرب <span className="required">*</span></label>
                <input type="text" value={traineeName} onChange={(e)=>setTraineeName(e.target.value)} required/>

                <label>المهنة <span className="required">*</span></label>
                <select value={selectedProfession} onChange={(e)=>setSelectedProfession(e.target.value)} required>
                  <option value="">اختر المهنة</option>
                  {professions.map((p,i)=><option key={i} value={p}>{p}</option>)}
                </select>

                <label>المعهد التدريبي <span className="required">*</span></label>
                <select value={trainingCenter} onChange={(e)=>setTrainingCenter(e.target.value)} required>
                  <option value="">اختر المعهد</option>
                  {trainingCenters.map((t,i)=><option key={i} value={t}>{t}</option>)}
                </select>

                <label>تقييم البيئة التدريبية <span className="required">*</span></label>
                <select value={evaluation} onChange={(e)=>setEvaluation(e.target.value)} required>
                  <option value="">اختر التقييم</option>
                  {["ضعيف","جيد","جيد جدًا","ممتاز"].map((r,i)=><option key={i} value={r}>{r}</option>)}
                </select>

                <div className="buttons">
                  <button type="button" className="red-btn next-btn" onClick={handleNext}>التالي</button>
                </div>
              </div>
            )}

            {step > 1 && step <= questions.length + 1 && (
              <div className="card">
                <p>{questions[step-2].question}</p>
                {questions[step-2].options.map((opt,i)=>(
                  <label key={i} className="radio-label">
                    <input type="radio" name={`q-${step-2}`} value={opt} checked={answers[step-2]===opt} onChange={()=>handleAnswerChange(step-2,opt)} required/>
                    {opt}
                  </label>
                ))}
                <div className="buttons">
                  {step>2 && <button type="button" className="red-btn prev-btn" onClick={handlePrev}>السابق</button>}
                  {step < questions.length+1 ? 
                    <button type="button" className="red-btn next-btn" onClick={handleNext}>التالي</button> :
                    <button type="submit" className="red-btn submit-btn">إرسال</button>
                  }
                </div>
              </div>
            )}

            {step === questions.length + 2 && (
              <div className="card">
                <label>ملاحظاتك واقتراحاتك</label>
                <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={4}/>
                <div className="buttons">
                  <button type="button" className="red-btn prev-btn" onClick={handlePrev}>السابق</button>
                  <button type="submit" className="red-btn submit-btn">إرسال</button>
                </div>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
