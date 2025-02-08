export default function sitemap() {
  const domain = "https://www.tickmarkq.com";
  
  const pages = ["", "about", "contact", "blogs", "free-exam", "service" , "book-lists" ,"profile" , "profile/course-list" ,"profile/upcoming-exam" , "my-exams", "profile/payment-history" , "profile/opinion" ];

  // পেজগুলো থেকে সাইটম্যাপ তৈরি করা
  return pages.map(page => ({
    url: `${domain}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly', 
    priority: 0.8, 
  }));
}
