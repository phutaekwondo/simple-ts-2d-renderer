const fs = require('fs');
const path = require('path');

function copyFolderRecursive(source, destination) {
    if (!fs.existsSync(source)) {
        console.error(`Source folder "${source}" does not exist.`);
        return;
    }

    fs.mkdirSync(destination, { recursive: true });

    const items = fs.readdirSync(source, { withFileTypes: true });

    for (const item of items) {
        const sourcePath = path.join(source, item.name);
        const destinationPath = path.join(destination, item.name);

        if (item.isDirectory()) {
            copyFolderRecursive(sourcePath, destinationPath);
        } else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}

const sourceFolder = path.join(__dirname, 'assets');
const destinationFolder = path.join(__dirname, 'dist', 'assets');

copyFolderRecursive(sourceFolder, destinationFolder);

console.log(`Assets folder copied to "${destinationFolder}" successfully.`);