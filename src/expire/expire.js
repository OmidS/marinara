window.onload = () => setTimeout(async () => await load());

async function load() {
  chrome.windows.getCurrent({}, thisWindow => {
    chrome.windows.update(thisWindow.id, { focused: true });
  });

  let phase = await BackgroundClient.getPhase();
  let settings = await BackgroundClient.getSettings();

  let start = document.getElementById('start-session');
  start.onclick = () => BackgroundClient.startSession();

  let title = document.getElementById('session-title');
  let subtitle = document.getElementById('session-subtitle');
  let action = document.getElementById('session-action');

  if (phase === 'focus') {
    title.innerText = 'Break finished';
    subtitle.innerText = `Start your ${settings.focus.duration} minute focus session when you're ready`;
    action.innerText = 'Start Focusing';
  } else if (phase === 'break') {
    title.innerText = 'Take a break!';
    subtitle.innerText = `Start your ${settings.break.duration} minute break when you're ready`;
    action.innerText = 'Start Break';
  }

  start.className += ' ' + phase;
};
