export default function assert (truth, message) {
  if (truth === false) {
    throw new Error(message)
  }
}
