export function cnModules(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
