/**
 * Funnel state & interaction coordinator for The Elite Fitness
 * Handles cross-section and cross-page context passing into #trial-booking
 */

export function selectProgramAndScroll(programName: string, tierOrNote?: string) {
  // If trial-booking exists in DOM, scroll smoothly and dispatch event
  const target = document.getElementById('trial-booking');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(
      new CustomEvent('elite:select-program', {
        detail: { program: programName, tier: tierOrNote }
      })
    );
  } else {
    // If on a subpage, navigate to homepage anchor with query params
    const searchParams = new URLSearchParams();
    searchParams.set('program', programName);
    if (tierOrNote) searchParams.set('tier', tierOrNote);
    window.location.href = `/#trial-booking?${searchParams.toString()}`;
  }
}
