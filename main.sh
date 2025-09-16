#!/bin/bash

# Save current directory
ROOT_DIR=$(pwd)

# Start client in a new terminal
gnome-terminal -- bash -c "cd \"$ROOT_DIR/client\" && npm run dev; exec bash"

# Start server in a new terminal
gnome-terminal -- bash -c "cd \"$ROOT_DIR/server\" && npx nodemon index.js; exec bash"

