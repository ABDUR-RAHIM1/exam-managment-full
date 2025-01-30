export default function sitemap() {
  const domain = "https://tickmarkq.com";
  
  // পেজগুলোর নামগুলোর তালিকা (এটি ডায়নামিকভাবে আপডেট করা যেতে পারে)
  const pages = ["", "about", "contact", "blogs", "free-exam", "service" , "book-lists" ,"profile" , "profile/course-list" ,"profile/upcoming-exam" , "my-exams", "profile/payment-history" , "profile/opinion" ];

  // পেজগুলো থেকে সাইটম্যাপ তৈরি করা
  return pages.map(page => ({
    url: `${domain}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',  // এখানে আপনি যেকোনো মান দিতে পারেন যেমন 'daily', 'weekly', 'yearly'
    priority: 0.8,  // এখানে আপনি যেকোনো মান দিতে পারেন
  }));
}
