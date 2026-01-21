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

            <TableCell>99 Anos 9 Meses</TableCell>

            <TableCell>EXPEDIENTE</TableCell>

            <TableCell>123456789</TableCell>

            <TableCell>99/99/2099</TableCell>

            <TableCell>OK</TableCell>

            <TableCell>99/99/2099</TableCell>

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
