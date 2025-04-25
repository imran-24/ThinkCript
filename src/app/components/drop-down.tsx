"use client";

import { ListCollection, Portal, Select } from "@chakra-ui/react";

interface SelectOptionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;  
  title?: string;
  placeholder: string;
  contentRef?: React.RefObject<HTMLDivElement | null>; 
  collection: ListCollection<{ label: string; value: string; }>;
}

export const DropDownMenu = ({
  collection,
  field,
  placeholder,
  title,
  contentRef
}: SelectOptionsProps) => {
  return (

    <Select.Root
    name={field.name}
    value={field.value}
    onValueChange={({ value }) => field.onChange(value)}
    onInteractOutside={() => field.onBlur()}
    collection={collection}
  >
    <Select.HiddenSelect />
    <Select.Label>{title}</Select.Label>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder={placeholder} />
      </Select.Trigger>
      <Select.IndicatorGroup>
        <Select.Indicator />
      </Select.IndicatorGroup>
    </Select.Control>
    <Portal container={contentRef}>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((category) => (
            <Select.Item
              item={category}
              key={category.value}
            >
              {category.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Portal>
  </Select.Root>
  );
};
