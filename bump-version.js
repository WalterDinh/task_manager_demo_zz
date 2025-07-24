const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, 'app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const version = appJson.expo.version || '1.0.0';
const versionCode = appJson.expo.android.versionCode || 1;
const buildNumber = appJson.expo.ios.buildNumber || '1';

function bumpVersionCode(v) {
  return v + 1;
}

function bumpBuildNumber(b) {
  return (parseInt(b) + 1).toString();
}

// Optional: Auto bump version like 1.0.2 -> 1.0.3
function bumpVersionString(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

// Update
appJson.expo.version = bumpVersionString(version);
appJson.expo.android.versionCode = bumpVersionCode(versionCode);
appJson.expo.ios.buildNumber = bumpBuildNumber(buildNumber);

// Save
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
console.log('📦 Bumped version to:', appJson.expo.version);
