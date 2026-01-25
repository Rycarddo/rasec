"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InfoButton from "./info-button";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AddMilitary from "./ui/add-military";

export default function ControlTable() {
  return (
    <>
      <div className="flex justify-between items-baseline">
        <Input
          className="w-2xl ml-4 mt-4 rounded-full"
          placeholder="Pesquise algo..."
        />
        <div className="flex gap-6 mx-4">
          {/* Futuramente gerar novo component */}
          <Button className="rounded-full">Gerar PDF</Button>

          {/* Gerar novo component */}
          <AddMilitary />
        </div>
      </div>

      <Table className="my-6 text-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">POSTO/GRAD</TableHead>

            <TableHead className="text-center">NOME</TableHead>

            <TableHead className="text-center">SEÇÃO</TableHead>

            <TableHead className="text-center">HABILITAÇÕES</TableHead>

            <TableHead className="text-center">MANUT</TableHead>

            <TableHead className="text-center">SIT</TableHead>

            <TableHead className="text-center">LPNA</TableHead>

            <TableHead className="text-center">VAL. HT</TableHead>

            <TableHead className="text-center">STATUS HT</TableHead>

            <TableHead className="text-center">INSPSAU</TableHead>

            <TableHead className="text-center">STATUS INSPSAU</TableHead>

            <TableHead className="text-center">INFOS.</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            {/* POSTO/GRAD */}
            <TableCell>SO</TableCell>

            {/* NOME */}
            <TableCell>PAPADA PAPADA PAPADA PAPADA</TableCell>

            {/* SECAO */}
            <TableCell>COM</TableCell>

            {/* HABILITACOES */}
            <TableCell>AFIS-S</TableCell>

            {/* MANUTENCAO */}
            <TableCell>SIM</TableCell>

            {/* SITUACAO */}
            <TableCell>EXPEDIENTE</TableCell>

            {/* LPNA */}
            <TableCell>123456789</TableCell>

            {/* VALIDADE DA HT */}
            <TableCell>99/99/2099</TableCell>

            {/* STATUS DA HT */}
            <TableCell>OK</TableCell>

            {/* VALIDADE DA INSPSAU */}
            <TableCell>99/99/2099</TableCell>

            {/* STATUS DA INSPSAU */}
            <TableCell>OK</TableCell>

            {/* INFORMACOES COMPLETAS */}
            <TableCell>
              <InfoButton />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
