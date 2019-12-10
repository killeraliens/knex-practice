SELECT
  e.emp_name as Full_Name,
  e.salary as Salary,
  d.dept_name as Department
FROM
  employee e
  INNER JOIN
  department d
  ON e.department = d.id
WHERE
  d.dept_name = 'Sales';


SELECT
  d.id,
  d.dept_name as department,
  e.emp_name as Manager_Name
FROM
  department d
  INNER JOIN
  employee e
ON
  d.manager = e.id;

SELECT
  d.id,
  d.dept_name as department,
  e.emp_name as Manager_Name
FROM
  department d
  LEFT JOIN
  employee e
ON
  d.manager = e.id;


SELECT
  e.emp_name as Manager_Name,
  d.dept_name as department
FROM
  department d
  RIGHT JOIN
  employee e
ON
  d.manager = e.id;

SELECT
  e.employee_name as Employee,
  p.project_name as Project
FROM
  employee e
JOIN
  employee_project ep
ON
  e.id = ep.employee_id
JOIN
  project p
ON
  p.id = ep.project_id
WHERE
  p.project_name ilike 'Plan Christmas party';


SELECT
  e.employee_name,
  p.project_name,
  d.department_name
FROM
  employee e
JOIN
  employee_project ep
ON
  e.id = ep.employee_id
JOIN
  project p
ON
  p.id = ep.project_id
JOIN
  department d
ON
  e.department_id = d.id
WHERE
  d.department_name ilike 'Warehouse'
AND
  p.project_name ilike 'Watch paint dry';


-- List only the managers that are assigned to the 'Watch paint dry' project.
select
  e.employee_name as Manager,
  p.project_name as Project,
  d.department_name as ManagesDepartment
from
  employee e
join
  employee_project ep
on
  e.id = ep.employee_id
join
  project p
on
  p.id = ep.project_id
join
  department d
on
  d.manager_id = e.id
where
  p.project_name ilike 'Watch paint dry';
