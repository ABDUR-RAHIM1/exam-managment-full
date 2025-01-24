
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          শর্তাবলী ও নীতিমালা
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ১. সাইটের সেবা
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>TickmarkQ.com একটি অনলাইন পরীক্ষা পরিচালনার প্ল্যাটফর্ম।</li>
            <li>
              সাইটটি পরীক্ষার প্রস্তুতি, রেজিস্ট্রেশন, আয়োজন এবং ফলাফল প্রকাশ
              করে।
            </li>
            <li>
              ব্যবহারকারী সাইটে বৈধ তথ্য প্রদান করবেন এবং নিয়ম মেনে চলবেন।
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ২. ব্যবহারকারীর দায়িত্ব
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>ব্যবহারকারীকে সঠিক ও সম্পূর্ণ তথ্য প্রদান করতে হবে।</li>
            <li>
              অ্যাকাউন্ট নিরাপদ রাখতে হবে এবং তৃতীয় পক্ষের সঙ্গে শেয়ার করা যাবে
              না।
            </li>
            <li>কোনো বেআইনি বা প্রতারণামূলক কাজ নিষিদ্ধ।</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ৩. তথ্যের সুরক্ষা এবং গোপনীয়তা
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              TickmarkQ.com ব্যবহারকারীর তথ্য সুরক্ষিত রাখতে প্রতিশ্রুতিবদ্ধ।
            </li>
            <li>
              ব্যবহারকারীর তথ্য তৃতীয় পক্ষের কাছে শেয়ার করা হবে না, তবে আইনগত
              প্রয়োজন হলে তথ্য প্রদান করা হতে পারে।
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ৪. পরীক্ষার শর্তাবলী
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              পরীক্ষার সময় সকল নির্দেশিকা ও শর্তাবলী মেনে চলতে হবে।
            </li>
            <li>
              প্রশ্নপত্রের উত্তর দেওয়ার সময় কোনো অনৈতিক কাজ করা যাবে না।
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            ৫. যোগাযোগ
          </h2>
          <p className="text-gray-700">
            যে কোনো প্রকার জিজ্ঞাসা বা অভিযোগের জন্য আমাদের সাথে যোগাযোগ করুন:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-2">
            <li>ইমেইল: tickmarkq@gmail.com</li>
            <li>ফোন: +৮৮০ ১৭৮০৬৯৬৪৪৮</li>
          </ul> 
        </section>

        <footer className="mt-8 text-center">
          <p className="text-gray-600">
            TickmarkQ.com ব্যবহার করে আমাদের সেবা গ্রহণ করার জন্য ধন্যবাদ। আপনার ভবিষ্যতের পরীক্ষামূলক যাত্রা শুভ হোক!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;
