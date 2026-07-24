export class BrowserHelper {
    static getBrowserInfo(userAgent: string) {
      let browser = 'Unknown';
      let version = 'Unknown';
      let os = 'Unknown';
      let device = '';
  
      // Browser
      if (userAgent.includes('Edg/')) {
        browser = 'Microsoft Edge';
        version = userAgent.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('Chrome/')) {
        browser = 'Google Chrome';
        version = userAgent.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('Firefox/')) {
        browser = 'Mozilla Firefox';
        version = userAgent.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
      } else if (
        userAgent.includes('Safari/') &&
        !userAgent.includes('Chrome/')
      ) {
        browser = 'Safari';
        version = userAgent.match(/Version\/([\d.]+)/)?.[1] || 'Unknown';
      } else if (userAgent.includes('OPR/')) {
        browser = 'Opera';
        version = userAgent.match(/OPR\/([\d.]+)/)?.[1] || 'Unknown';
      }
  
      // Operating System
      if (userAgent.includes('Windows NT 10.0')) {
        os = 'Windows 10';
      } else if (userAgent.includes('Windows NT 11.0')) {
        os = 'Windows 11';
      } else if (userAgent.includes('Android')) {
        os = 'Android';
      } else if (
        userAgent.includes('iPhone') ||
        userAgent.includes('iPad')
      ) {
        os = 'iOS';
      } else if (userAgent.includes('Mac OS X')) {
        os = 'macOS';
      } else if (userAgent.includes('Linux')) {
        os = 'Linux';
      }
  
      // Device Type
      if (
        userAgent.includes('Mobile') ||
        userAgent.includes('Android') ||
        userAgent.includes('iPhone') ||
        userAgent.includes('iPad')
      ) {
        device = 'Mobile';
      } else {
        device = 'Desktop';
      }
  
      return {
        browser,
        version,
        os,
        device,
      };
    }
  }