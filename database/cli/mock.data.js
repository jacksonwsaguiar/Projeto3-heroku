const db = require("../index");
db.run(`INSERT INTO owner (name, access_code, email) values 
('Bar Lysons', 98398, 'blysons0@cornell.edu'),
('Carroll Lucks', 71784, 'clucks1@telegraph.co.uk');`);

console.log("owners data generated");

db.run(
  `
    INSERT INTO hotel (name, capacity, budget, city, state, address, owner_id) values 
    ('Heathcote-Beer', 8155, 4735, 'San Diego', 'California', '3582 Bultman Crossing', 1),
    ('Emard-Green', 4909, 7316, 'Santa Cruz', 'California', '2 Fairview Center', 1),
    ('Jast Inc', 7097, 4817, 'Orange', 'California', '52970 Amoth Plaza', 1),
    ('Schoen, Buckridge and Runte', 5253, 2838, 'Oakland', 'California', '05 Macpherson Center', 1),
    ('Kassulke, Abshire and Parker', 6702, 5041, 'Lynn', 'Massachusetts', '8329 Mosinee Hill', 1),
    ('Jerde Group', 9720, 2211, 'San Jose', 'California', '553 Westport Place', 2),
    ('Lubowitz Group', 7225, 3221, 'San Diego', 'California', '853 Farmco Lane', 2),
    ('Lang-Quitzon', 2917, 8645, 'Petaluma', 'California', '9618 Corben Park', 2),
    ('Koepp-Nader', 3782, 4300, 'Fresno', 'California', '3 Homewood Place', 2);
    `
);
console.log("hotels data generated");

db.run(
  `
    INSERT INTO book (
    started,
    ended,
    value,
    customer_name,
    hotel_id)
    values 
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',4000,'robert tes', 2 ),
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',2000,'robert tes 1', 1 ),
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',5000,'robert tes 2', 5 ),
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',1000,'robert tes 3', 2 ),
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',3000,'robert tes 4', 2 ),
    ('22-05-2021 15:22:00','24-05-2021 15:22:00',500,'robert tes 5', 1 );
    
    `
);
console.log("books data generated");
