"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScanSearch } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>POSTO/GRAD</TableHead>
            <TableHead>NOME</TableHead>
            <TableHead>HABILITAÇÕES</TableHead>
            <TableHead>MANUTENÇÃO</TableHead>
            <TableHead>TEMPO SERVIÇO</TableHead>
            <TableHead>SITUAÇÃO</TableHead>
            <TableHead>LPNA</TableHead>
            <TableHead>VAL. HT</TableHead>
            <TableHead>STATUS HT</TableHead>
            <TableHead>INSPSAU</TableHead>
            <TableHead>STATUS INSPSAU</TableHead>
            <TableHead>INFOS.</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>SO</TableCell>

            <TableCell>PAPADA</TableCell>

            <TableCell>AFIS-S</TableCell>

            <TableCell>SIM</TableCell>

            <TableCell>31 Anos 5 Meses</TableCell>

            <TableCell>EXPEDIENTE</TableCell>

            <TableCell>2013264609</TableCell>

            <TableCell>18/09/2025</TableCell>

            <TableCell>OK</TableCell>

            <TableCell>31/01/2024</TableCell>

            <TableCell>OK</TableCell>

            <TableCell>
              <ScanSearch className="cursor-pointer" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
