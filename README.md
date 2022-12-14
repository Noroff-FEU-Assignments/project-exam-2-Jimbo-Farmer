# Holidaze

![holidaze screenshot](https://github.com/Noroff-FEU-Assignments/project-exam-2-Jimbo-Farmer/blob/main/screenshot-holidaze.png)

## Description

This is an exam project based on the brief below. 
The final website is [here](https://neon-hamster-1b3f8e.netlify.app/).

## Build Details

The backend of the project was completed using Strapi CMS hosted with Heroku and Cloudinary. 
The frontend is a Next.js app with styling in SCSS. 

## Instructions

- Download the zip file. 
- Open in code editor. 
- Run 'npm install' in the terminal.
- Run 'npm run dev' in the terminal.

## Login Info for admin users. 

- email: admin@admin.com
- password: Admin123

## Copyright

- The brief below is the property of Noroff School of Technology and Digital Media.
- Some (four) of the images are from unsplash and these contain the name of the photographer and links to the original image. The rest of the images were generated using DALL-E 2.  
- Feel free to use any of my design and code 🙂  

----------------------------------------------------------
----------------------------------------------------------

## Brief

The final submission must have the following:
- A Gantt chart planning the project
- A style guide
- An Adobe XD prototype
- Use a CSS Pre-processor and BEM if not using CSS Modules, Styled Components, etc
- Use a React.js or Next.js
- You can use regular JS or TypeScript
- Please use create-react-app or create-next-app to generate a skeleton project for yourself
- A fully working website that fulfils the brief

## Hotel Booking Website
A local tourism agency in Bergen is launching a new website called ‘Holidaze’ for visitors to the area to be able to find hotels, B&Bs and guesthouses, and for the accommodation owners to receive enquiries.

The project requires you to create the visitor side of the website where users can search accommodation and make enquiries, as well as the administration side where properties can be added and enquiries managed.

You will need to create an API to store the data for the establishments, enquiries and contact submissions. You can choose to use WordPress or Strapi as a Headless CMS, but it is very important that the API is deployed and publicly available. Please do not submit any files for your API. Only submit the website you have created. 

## Requirements for the Website

### Visitor Side
- Homepage
- Search bar typeahead (auto dropdown with hotel names that match what has been typed)
- A results page with all hotels
- The hotel specific page which displays all details about the hotel
- An enquiry page either modal or separate page
- A contact page (different to enquiry page) which goes to the admin for Holidaze

### Admin side
- Create a login section that makes use of JWT tokens
- List of enquiries and new enquiries appear when user submits the form on the enquiry page
- List of messages from contact form
- The admin can create a new establishment

### Recommended Process
Week 1 and 2:  Planning and Design
Week 3 to 6: Coding
Week 7: Bug Fixing

### Level 1 Process
- Start by planning out the project. 
- Next begin your research of likely users and browse competitor websites for ideas.
- Create a style guide
- Build an Adobe XD prototype (or you can use Sketch or Figma).
- Start coding. 
- Once you’ve finished development, start looking for bugs and ensure the site functions well on all viewports. Test the code on different devices. Because your API is public, the code shouldn’t rely on a local API.
- Refactor your code.
- Ask another student to look over your code and ask them if they can see how it might be better implemented. This is important to get an outside view on your code. Please attach this feedback to your report.
- Add the login details for your admin side at the top of this README.md file so that it's easy for the marker to spot.

### Submission
End of week 7: Report with link to website or a Github link and feedback from code review, and all files in a compressed ZIP. Login details added to the README.md.

### Resources
Report template included in the repo.

[Video on deploying Strapi to Heroku](https://vimeo.com/689226140/9b378e06b2)
