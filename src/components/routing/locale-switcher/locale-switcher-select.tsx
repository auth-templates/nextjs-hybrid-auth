'use client';

import { useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Combobox, ComboboxDropdown,ComboboxOption, ComboboxOptions, ComboboxTarget, Group, Input, Text, useCombobox } from '@mantine/core';
import classes from './locale-switcher-select.module.module.css'
import Flag from 'react-world-flags'

type ComboboxItem = {
  value: string;
  label: string;
};

type Props = {
  data: ComboboxItem[]
  defaultValue: string
};

export default function LocaleSwitcherSelect({
  data,
  defaultValue
}: Props) {
  const [selected, setSelected] = useState<string>(defaultValue || 'en');
  const combobox = useCombobox();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (value: string) => {
    setSelected(value);
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known params
        // are used in combination with a given pathname. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value }
      );
    });
    combobox.closeDropdown();
  };

  const selectedItem = data.find((item) => item.value === selected);

  return (
    <Combobox store={combobox} disabled={isPending}>
      <ComboboxTarget>
        <Input
            classNames={{input: classes.input}}
          component="button"
          pointer
          onClick={() => combobox.toggleDropdown()}
          rightSection="▼"
        >
          <Group gap="xs">
            <Flag
              code={selected === 'en' ? 'us' : selected}
              style={{ width: 20, height: 20 }}
            />
            <Text>{selectedItem?.label}</Text>
          </Group>
        </Input>
      </ComboboxTarget>

      <ComboboxDropdown classNames={{
        dropdown: classes.dropdown
      }}>
        <ComboboxOptions
            classNames={{
                options: classes.options
            }}
        >
          {data
            .filter((item) => item.value !== selected)
            .map((item) => (
              <ComboboxOption    
                classNames={{
                    option: classes.option
                }}
                key={item.value}
                value={item.value}
                onClick={() => onSelectChange(item.value)}
              >
                <Group gap="xs">
                  <Flag
                    code={item.value === 'en' ? 'us' : item.value}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text>{item.label}</Text>
                </Group>
              </ComboboxOption>
            ))}
        </ComboboxOptions>
      </ComboboxDropdown>
    </Combobox>
  );
}