#!/bin/bash

echo
echo --------------------🇨🇳 Project Setup🇨🇳 --------------------
echo 😊 Enter your custom configurations when prompted, otherwise hit 'enter' to use default.

read -p "Database hostname (localhost): " database
read -p "Database user (root): " user
read -s -p "Database password: " pass
echo
echo
LOGWRITE="DEV_DB_HOST=${database:='localhost'}\nDEV_DB_USER=${user:='root'}\nDEV_DB_PASS=lol i ain't showing you shit\n"

echo '📋 Writing the following configuration to .env:'
echo $LOGWRITE

cat > ./.env << EOF1
DEV_DB_HOST=${database:='localhost'}
DEV_DB_USER=${user:='root'}
DEV_DB_PASS=$pass
EOF1

# Databaset setup
read -p "🤔 Do you want to run database setup? (⚠️  existing data will be cleared ⚠️ ) [y/n]: " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	export MYSQL_PWD=$pass
	echo 🚴 Setting up database...
	mysql -u $user -e "DROP DATABASE IF EXISTS request;CREATE DATABASE request;USE request;"
	echo 📚 Completed
	unset MYSQL_PWD
else
	echo 🌭 Skipping database setup
fi

echo
echo 😊 About to install dependencies with Yarn...
yarn
echo -------------------🇨🇳 Setup completed🇨🇳  --------------------
