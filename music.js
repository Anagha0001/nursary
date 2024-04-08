<script>
    // Setting up Firebase with our website
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.database(); // Use Realtime Database instead of Firestore

    function uploadFile() {
        // Get input values
        const musicTitle = document.getElementById('musicTitle').value;
        const category = document.getElementById('category').value;
        const musicFile = document.getElementById('musicFile').files[0];
        const imageFile = document.getElementById('imageFile').files[0];

        // Create a unique ID for the files
        const fileId = Date.now().toString();

        // Get references to Firebase Storage
        const storageRef = firebase.storage().ref(music/${category}/${fileId});

        // Create progress bar elements
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progressBarFill = document.createElement('div');
        progressBarFill.className = 'progress-bar-fill';
        progressBar.appendChild(progressBarFill);

        document.getElementById('uploadForm').appendChild(progressBar);

        // Upload music file to Firebase Storage
        const musicTask = storageRef.child(${fileId}.mp3).put(musicFile);

        // Upload image file to Firebase Storage
        const imageTask = storageRef.child(${fileId}.jpg).put(imageFile);

        // Wait for both tasks to complete
        Promise.all([musicTask, imageTask])
            .then(() => {
                // Get download URLs for the uploaded files
                return Promise.all([musicTask.snapshot.ref.getDownloadURL(), imageTask.snapshot.ref.getDownloadURL()]);
            })
            .then((urls) => {
                const musicUrl = urls[0];
                const imageUrl = urls[1];

                // Save metadata to Firebase Realtime Database
                db.ref('music/' + fileId).set({
                    title: musicTitle,
                    category: category,
                    musicUrl: musicUrl,
                    imageUrl: imageUrl
                });

                alert('Upload successful!');
            })
            .catch(error => {
                console.error(error.message);
                alert('Upload failed. Please try again.');
            });

        // Listen for state changes, errors, and completion of the music upload.
        musicTask.on('state_changed',
            function (snapshot) {
                // Update progress bar during the upload
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBarFill.style.width = progress + '%';
            },
            function (error) {
                console.error(error.message);
                alert('Upload failed. Please try again.');
            },
            function () {
                // Get download URL for the uploaded music file
                musicTask.snapshot.ref.getDownloadURL().then(function (musicUrl) {
                    // ... Your existing code ...
                    // Here, you can update the UI or perform additional actions after upload completion.
                    alert('Upload successful!');
                });
            }
        );
    }
</script>