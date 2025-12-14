"use client";

import { Badge, Group, Table, Text, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";
import { uiConstants } from "@/lib/config";
import type { ProductsTableProps } from "./types/product.type";

export const ProductsTable = memo(function ProductsTable({
  products,
  sortBy,
  order,
  onSort,
}: ProductsTableProps) {
  const getSortIcon = (column: "price" | "title") => {
    if (sortBy === column) {
      return order === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  if (products.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        Brak produktów do wyświetlenia
      </Text>
    );
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Obraz</Table.Th>
          <Table.Th>
            <UnstyledButton onClick={() => onSort("title")}>
              <Group gap={4}>
                <Text fw={600}>Nazwa</Text>
                <Text c={sortBy === "title" ? "blue" : "dimmed"} size="sm">
                  {getSortIcon("title")}
                </Text>
              </Group>
            </UnstyledButton>
          </Table.Th>
          <Table.Th>Kategoria</Table.Th>
          <Table.Th>
            <UnstyledButton onClick={() => onSort("price")}>
              <Group gap={4}>
                <Text fw={600}>Cena</Text>
                <Text c={sortBy === "price" ? "blue" : "dimmed"} size="sm">
                  {getSortIcon("price")}
                </Text>
              </Group>
            </UnstyledButton>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product) => (
          <Table.Tr key={product.id}>
            <Table.Td>
              <Image
                src={product.images?.[0] || uiConstants.placeholderImage}
                alt={product.title}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
            </Table.Td>
            <Table.Td>
              <Text fw={500}>{product.title}</Text>
            </Table.Td>
            <Table.Td>
              <Badge variant="light">{product.category.name}</Badge>
            </Table.Td>
            <Table.Td>
              <Text fw={600}>${product.price}</Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
});
