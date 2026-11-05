# Portfolio: Laravel + Inertia.js + React (Skills CRUD)

Midterm Laboratory Activity for IT ELEC01 – Advanced Web Development.

A blue cyber portfolio website converted to Laravel + Inertia.js + React. The Skills section is dynamic: skills are stored in a MySQL database and managed through a CRUD feature with server-side validation.

## Project structure
- `index.html`, `css/`, `js/` – the original static portfolio
- `portfolio/` – the Laravel + Inertia + React application (this is the one to run)

## Requirements
- PHP 8.2 or newer
- Composer
- Node.js 18 or newer
- MySQL (XAMPP works, start MySQL only)

## Setup
1. Go into the Laravel folder:
   ```bash
   cd portfolio
   ```
2. Install the dependencies:
   ```bash
   composer install
   npm install
   ```
3. Create the environment file and app key:
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```
4. Create an empty database named `portfolio_db` in phpMyAdmin, then set these values in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```
5. Create the tables and add the sample skills:
   ```bash
   php artisan migrate
   php artisan db:seed --class=SkillSeeder
   ```

## Run the app
Use two terminals inside the `portfolio` folder:
```bash
php artisan serve
```
```bash
npm run dev
```
Then open http://127.0.0.1:8000

## How to use it
- The public portfolio is at `/`.
- Register an account at `/register`, then click "Manage skills" in the navbar (`/skills`) to add, edit and delete skills.

## Main files
| Part | File |
| --- | --- |
| Migration | `portfolio/database/migrations/..._create_skills_table.php` |
| Model | `portfolio/app/Models/Skill.php` |
| Controller and validation | `portfolio/app/Http/Controllers/SkillController.php` |
| Routes | `portfolio/routes/web.php` |
| Pages | `portfolio/resources/js/Pages/Portfolio.jsx`, `portfolio/resources/js/Pages/Skills/` |
| Components | `portfolio/resources/js/Components/` |
