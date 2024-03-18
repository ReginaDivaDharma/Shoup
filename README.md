# Key Web Features
The website Shoup has several pages function such as homepage, gallery, and Manage Gallery for now. 

# Backend
the backend is made with node.js and mysql (mariadb) server with XAMPP, here i have index.js to deal with routings in the backend folder, while within the routes folder i have several files containing APIs for each functional page, i connect the database with database.js file, where i use port 5000

# Homepage
Within the homepage section of the project, i have several charts showing what type of fanmerch i make and their analytics, as in what games they are from, inspiration, type of merch, which ones are the best selling according to the data etc, i have several endpoints and im using several custom-made components here as well like cards, barchart,etc

# Gallery
Within the gallery i have shown several products or drawings using a database i have created called shoup, here user can also click the drawing and a modal will pop up to explain the image's details

# Manage Gallery
Within manage gallery page i have a table component showing what kinds of artwork there is available, we can delete and add artwork. If user clicks on add artwork a modal will pop up and they will be asked to insert their datas, this data will be inserted into the database, but for the image it will be uploaded to /public/artwork, deletion for artwork data is the same. User can now edit their artwork datas 
