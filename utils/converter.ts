export const Converter = {
  boolFromString: (value: R1Boolean): boolean => {
    return value == "true" || value == "1" || value == "t" || value == true;
  },
};
