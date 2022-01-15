INSERT INTO department(name) VALUES ("IT");




INSERT INTO roles(title,salary,department_id) VALUES ("Full Stack Engineer",100000,1);
INSERT INTO roles(title,salary,department_id) VALUES("Manager", 2000000, 1);

INSERT INTO employee(first_name, last_name, role_id) VALUES ("Manager", "IT", (SELECT id FROM roles WHERE title = "Manager"));
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Salman", "Ghouse", 1, 1)