const sampleListings = [
    {
        title: "Cozy Studio in Mumbai",
        description: "A compact and clean studio apartment ideal for solo travelers or couples.",
        price: 1200,
        location: "Mumbai, Maharashtra",
        image: {
            fileName:"ListingImage",
            url:"https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Rooftop Loft in Bangalore",
        description: "Spacious loft apartment with rooftop access and modern interior.",
        price: 1800,
        location: "Bangalore, Karnataka",
        image: {
            fileName:"ListingImage",
            url: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=1567&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }   
    },
    {
        title: "Affordable Room in Delhi",
        description: "Simple and affordable room located near metro and markets.",
        price: 850,
        location: "New Delhi, Delhi",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1475&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Shared Hostel in Pune",
        description: "Budget-friendly hostel accommodation with shared kitchen.",
        price: 500,
        location: "Pune, Maharashtra",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Countryside Home in Kerala",
        description: "Peaceful home stay surrounded by lush greenery and backwaters.",
        price: 1000,
        location: "Alleppey, Kerala",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Private Room in Jaipur",
        description: "Clean private room in a heritage-style home near the city palace.",
        price: 900,
        location: "Jaipur, Rajasthan",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Tiny House in Goa",
        description: "Modern and compact tiny house just 10 mins from the beach.",
        price: 1400,
        location: "Anjuna, Goa",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Hill View Cabin in Manali",
        description: "Wooden cabin with a stunning view of the Himachal mountains.",
        price: 1600,
        location: "Manali, Himachal Pradesh",
        image: {
            fileName:"ListingImage",
            url: "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Beachside Room in Pondicherry",
        description: "Affordable room with sea view and French-style architecture.",
        price: 1100,
        location: "Pondicherry, India",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Modern Apartment in Hyderabad",
        description: "Contemporary 1BHK apartment located near HITEC City.",
        price: 1500,
        location: "Hyderabad, Telangana",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Peaceful Room in Rishikesh",
        description: "Stay near the Ganga with yoga-friendly environment.",
        price: 700,
        location: "Rishikesh, Uttarakhand",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Backpacker Hostel in Varanasi",
        description: "Clean bunk beds with Ganga river view and rooftop café.",
        price: 600,
        location: "Varanasi, Uttar Pradesh",
        image: {
            fileName:"ListingImage",
            url: "https://media.istockphoto.com/id/1140134569/photo/3d-rendering-of-modern-clinker-house-on-the-ponds-with-pool-in-night.jpg?s=1024x1024&w=is&k=20&c=fbKW5VxS6rQnHAPWU-u8Xeao52aeS8IiFcY1FYVGcwQ="
        }
    },
    {
        title: "Cultural Home Stay in Udaipur",
        description: "Beautifully designed home with traditional Rajasthani decor.",
        price: 1300,
        location: "Udaipur, Rajasthan",
        image: {
            fileName:"ListingImage",
            url: "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Urban Studio in Ahmedabad",
        description: "Affordable studio with modern furnishing in the heart of the city.",
        price: 1000,
        location: "Ahmedabad, Gujarat",
        image: {
            fileName:"ListingImage",
            url: "https://images.unsplash.com/photo-1501635238895-63f29cfc06b3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    {
        title: "Treehouse Stay in Wayanad",
        description: "Eco-friendly treehouse amidst the lush Western Ghats.",
        price: 1700,
        location: "Wayanad, Kerala",
        image: {
            fileName:"ListingImage",
            url: "https://plus.unsplash.com/premium_photo-1664301254629-a93baecd1cf5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    }
];

export default sampleListings;
// This file contains sample data for seeding the database with initial listings.

