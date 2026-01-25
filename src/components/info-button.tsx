"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScanSearch, SquarePen, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function InfoButton() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <ScanSearch className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="overflow-x-auto">
          <DialogHeader className="flex flex-row justify-between mx-8">
            <DialogTitle>Informações completas</DialogTitle>

            <div className="flex size-5">
              <SquarePen className="cursor-pointer" />
            </div>
          </DialogHeader>

          <div id="tables-info-button">
            <Table id="table-1" className="my-6 text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">POSTO/GRAD</TableHead>

                  <TableHead className="text-center">NOME</TableHead>

                  <TableHead className="text-center">SEÇÃO</TableHead>

                  <TableHead className="text-center">HABILITAÇÕES</TableHead>

                  <TableHead className="text-center">MANUTENÇÃO</TableHead>

                  <TableHead className="text-center">IDENT</TableHead>

                  <TableHead className="text-center">SARAM</TableHead>

                  <TableHead className="text-center">TELEFONE</TableHead>

                  <TableHead className="text-center">CPF</TableHead>

                  <TableHead className="text-center">EMAIL</TableHead>
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

                  {/* IDENTIDADE */}
                  <TableCell>123456</TableCell>

                  {/* SARAM */}
                  <TableCell>12345678</TableCell>

                  {/* TELEFONE */}
                  <TableCell>(12) 34567-8901</TableCell>

                  {/* CPF */}
                  <TableCell>12345678901</TableCell>

                  {/* EMAIL */}
                  <TableCell>PAPADA@EMAIL.COM</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table id="table-2" className="my-6 text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">DATA FORM</TableHead>

                  <TableHead className="text-center">ULTIMA PROM.</TableHead>

                  <TableHead className="text-center">DATA PRAÇA</TableHead>

                  <TableHead className="text-center">DATA APRES.</TableHead>

                  <TableHead className="text-center">TEMPO DE ÁREA</TableHead>

                  <TableHead className="text-center">TEMPO SV</TableHead>

                  <TableHead className="text-center">SITUAÇÃO</TableHead>

                  <TableHead className="text-center">NOTA T. OPR.</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  {/* DATA DE FORMATURA */}
                  <TableCell>99/99/9999</TableCell>

                  {/* ULTIMA PROMOCAO*/}
                  <TableCell>99/99/9999</TableCell>

                  {/* DATA DE PRAÇA */}
                  <TableCell>99/99/9999</TableCell>

                  {/* DATA DE APRESENTACAO */}
                  <TableCell>99/99/9999</TableCell>

                  {/* TEMPO DE AREA */}
                  <TableCell>99/99/9999</TableCell>

                  {/* TEMPO DE SERVICO */}
                  <TableCell>99/99/9999</TableCell>

                  {/* SITUACAO */}
                  <TableCell>EXPEDIENTE</TableCell>

                  {/* NOTA DO TESTE OPERACIONAL */}
                  <TableCell>10</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table id="table-3" className="my-6 text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">AVALIADOR</TableHead>

                  <TableHead className="text-center">DATA PROVA TEO.</TableHead>

                  <TableHead className="text-center">LNPA</TableHead>

                  <TableHead className="text-center">VALIDADE HT</TableHead>

                  <TableHead className="text-center">STATUS HT</TableHead>

                  <TableHead className="text-center">INSPSAU</TableHead>

                  <TableHead className="text-center">STATUS INSPSAU</TableHead>

                  <TableHead className="text-center">DATA NASC</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  {/* AVALIADOR? */}
                  <TableCell>SIM</TableCell>

                  {/* DATA PROVA TEORICA */}
                  <TableCell>99/99/9999</TableCell>

                  {/* LPNA */}
                  <TableCell>123456789</TableCell>

                  {/* VALIDADE DA HT */}
                  <TableCell>99/99/9999</TableCell>

                  {/* STATUS DA HT */}
                  <TableCell>OK</TableCell>

                  {/* INSPSAU */}
                  <TableCell>99/99/9999</TableCell>

                  {/* STATUS INSPSAU */}
                  <TableCell>OK</TableCell>

                  {/* DATA DE NASCIMENTO */}
                  <TableCell>99/99/9999</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
