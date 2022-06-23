export function getIncludeQueryForFullUser() {
  return {
    admin_type: true,
    subscription: {
      include: {
        price: true
      }
    }
  }
}
