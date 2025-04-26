import { ListCollection, Portal, Select } from "@chakra-ui/react";

interface SelectFilterProps {
  value: string[];
  handleChange: (value: string[]) => void;
  collections: ListCollection<{ label: string; value: string }>;
  placeholder: string;
}

export const SelectFilter = ({
  handleChange,
  value,
  collections,
  placeholder,
}: SelectFilterProps) => {

  return (
    <Select.Root
      collection={collections}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onValueChange={(e: any) => handleChange(e.value)} // here Chakra passes the value directly
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collections.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
