"# LmsCore" 
create link "npm link"

use link "npm link mcs-lms-core"

…or create a new repository on the command line
echo "# LmsReporting" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/mcssoftware/LmsReporting.git
git push -u origin master
…or push an existing repository from the command line


git remote add origin https://github.com/mcssoftware/LmsReporting.git
git push -u origin master

gulp package
npm pack
npm install ../LmsCore/mcs-lms-core-0.0.1.tgz
