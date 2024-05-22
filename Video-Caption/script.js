const captionInput = document.getElementById('caption-input');
        const timestampInput = document.getElementById('timestamp-input');
        const captionList = document.getElementById('caption-list');
        let player;

        function loadVideo() {
            const videoUrl = document.getElementById('video-url').value.trim();
            if (!videoUrl) return;

            const videoId = getYouTubeId(videoUrl);
            if (!videoId) {
                console.error('Invalid YouTube URL');
                return;
            }

            player = new YT.Player('player', {
                height: '315',
                width: '100%',
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

        function onPlayerReady(event) {
            // Enable captions
            player.loadModule('captions');
        }

        function addCaption() {
            const caption = captionInput.value.trim();
            const timestamp = parseFloat(timestampInput.value.trim());

            if (!caption || isNaN(timestamp)) return;

            const captionItem = document.createElement('li');
            captionItem.textContent = `${formatTime(timestamp)} - ${caption}`;
            captionItem.style.color = 'white'; // Set caption color to white
            captionList.appendChild(captionItem);

            // Add cue point for the caption
            player.addCuepoint(timestamp, showCaption.bind(null, caption));

            captionInput.value = '';
            timestampInput.value = '';
        }

        function showCaption(caption) {
            alert(caption);
        }

        function toggleVideo() {
            if (player.getPlayerState() === YT.PlayerState.PAUSED) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        }


        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
        }

        function padZero(number) {
            return (number < 10 ? '0' : '') + number;
        }

        function getYouTubeId(url) {
            const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return match[2];
            } else {
                return null;
            }
        }