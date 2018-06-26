export function sortEmployeesArray(array) {
  array.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA > nameB;
  });
}

export function sortDropdownArray(array) {
  array.sort((a, b) => {
    const nameA = a.toUpperCase();
    const nameB = b.toUpperCase();
    return nameA > nameB;
  });
}
