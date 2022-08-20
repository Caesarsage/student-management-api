// const { places, descriptors } = require("./seedHelpers");
// const mongoose = require("mongoose");

// const Blog = require("../models/blogModel");
// const dbURL = process.env.MONGO_URL
// mongoose.connect("mongodb://localhost:27017/blog-camp", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected correctly");
// });

// const random = (x) => x[Math.floor(Math.random() * x.length)];

// const seedDB = async () => {
//   await Blog.deleteMany({});
//   for (let i = 0; i < 20; i++) {
//     const blog = new Blog({
//       title: `${random(descriptors)} ${random(places)}`,
//       capture: "Introduction to Frontend Technologies",
//       content:
//         "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium optio molestiae ipsa eligendi expedita suscipit libero repudiandae animi ratione possimus a incidunt, recusandae sapiente placeat perspiciatis architecto. Alias, esse qui!L Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, praesentium necessitatibus asperiores similique aliquid quis dicta reiciendis in voluptatibus animi, vitae non perspiciatis ex facere, aliquam et quas molestiae odit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus maxime quia suscipit enim, aliquam quisquam vel beatae dolorum pariatur expedita hic ratione nihil perspiciatis repudiandae ea voluptas facere obcaecati tenetur.",
//       author: "5ff307f6c421802290579a95",
//       image: {
//         path: "https://res.cloudinary.com/caesarsage/image/upload/v1609757490/Blog/vucek0svz8nem2rkdhpo.jpg",
//         filename: "Blog/vucek0svz8nem2rkdhpo",
//       },
//     });
//     await blog.save();
//   }
// };

// seedDB().then(() => {
//   mongoose.connection.close();
// });
