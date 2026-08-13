const TIMER_KEY = 'study_timer'

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === TIMER_KEY) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">✅</text></svg>',
      title: 'study://',
      message: 'Session complete! Time for a break.',
      priority: 2
    })

    chrome.storage.local.remove([TIMER_KEY])
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startTimer') {
    const { duration, task } = message

    chrome.alarms.create(TIMER_KEY, {
      delayInMinutes: duration,
      periodInMinutes: null
    })

    chrome.storage.local.set({
      [TIMER_KEY]: {
        status: 'running',
        endTime: Date.now() + duration * 60 * 1000,
        duration,
        task
      }
    })

    sendResponse({ success: true })
  }

  if (message.type === 'cancelTimer') {
    chrome.alarms.clear(TIMER_KEY)
    chrome.storage.local.remove([TIMER_KEY])
    sendResponse({ success: true })
  }

  if (message.type === 'getTimer') {
    chrome.storage.local.get([TIMER_KEY], (result) => {
      sendResponse(result[TIMER_KEY] || null)
    })
    return true
  }

  return false
})
