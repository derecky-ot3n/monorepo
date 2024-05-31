import { createSecretKey } from 'crypto';
import { useEffect, useState } from 'react';

declare const turnstile: any;

export enum EXECUTION {
  RENDER = 'render',
  EXECUTE = 'execute',
}

function printColoredMsg(msg: string, color: string) {
  console.log(`%c${msg}`, `color: ${color};`);
}

export function useCloudflareTurnstile(
  containerId: string,
  execution: EXECUTION
) {

  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileWidgetId, setTurnstileWidgetId] = useState('');

  function prepareTurnstileWidget() {
    const widgetId = turnstile.render(`#${containerId}`, {
      sitekey: process.env.NEXT_PUBLIC_CAPTCHA_SITE?.toString(),
      language: 'pt-br',
      execution,
      callback: function (token: string) {
        printColoredMsg(`${widgetId}: Challenge Success ${token}`, 'mediumseagreen');
        setTurnstileToken(token);
      },
      'expired-callback': function () {
        printColoredMsg('Expired Callback', 'orangered');

        setTurnstileToken('');
        turnstile.reset(`#${containerId}`);
        turnstile.execute(`#${containerId}`);
      },
    });

    setTurnstileWidgetId(widgetId);

    printColoredMsg(`--- prepareTurnstileWidget #${containerId} ---`, 'steelblue');
    printColoredMsg(`new widgetId #${widgetId} ---`, 'steelblue');
  }

  // Remove Cloudflare Turnstile widget when component unmounts
  useEffect(() => {
    return () => {
      printColoredMsg('--- cleanup Turnstile ---', 'salmon');
      if (turnstileWidgetId) {
        printColoredMsg(`Removed Turnstile widget: ${turnstileWidgetId}`, 'salmon');
        turnstile.remove(turnstileWidgetId);
      }
    };
  }, [turnstileWidgetId]);

  return {
    turnstileToken,
    setTurnstileToken,
    turnstileWidgetId,
    setTurnstileWidgetId,
    prepareTurnstileWidget,
  };
}