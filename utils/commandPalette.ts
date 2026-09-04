/** The command palette (NavBar's ⌘K button) and CommandPalette itself are
 * two separate components — this shared constant keeps the custom-event
 * name they communicate through in one place instead of duplicated strings. */
export const COMMAND_PALETTE_OPEN_EVENT = "open-command-palette";

export function dispatchOpenCommandPalette(): void {
  window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT));
}
