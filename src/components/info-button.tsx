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
import { ScanSearch, SquarePen } from "lucide-react";
import type { getMilitaries } from "@/actions/get-militaries";

type MilitaryResult = Awaited<ReturnType<typeof getMilitaries>>;
type Military = NonNullable<MilitaryResult["data"]>[number];

interface InfoButtonProps {
  military: Military;
}

export default function InfoButton({ military }: InfoButtonProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getDateStatus = (date: Date) => {
    const today = new Date();
    const validityDate = new Date(date);
    const diffDays = Math.ceil(
      (validityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "VENCIDO";
    if (diffDays <= 45) return "VENCENDO";
    return "OK";
  };

  const formatRank = (rank: string) => {
    return rank.replace("Rank_", "");
  };

  const formatSection = (section: string) => {
    return section.replace("DTCEA_", "DTCEA-");
  };

  const calculateServiceTime = () => {
    const today = new Date();
    const pracaDate = new Date(military.pracaAt);
    const diffTime = Math.abs(today.getTime() - pracaDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
    );
    return `${diffYears} anos e ${diffMonths} meses`;
  };

  const calculateAreaTime = () => {
    const today = new Date();
    const presentationDate = new Date(military.presentationDate);
    const diffTime = Math.abs(today.getTime() - presentationDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
    );
    return `${diffYears} anos e ${diffMonths} meses`;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <ScanSearch className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="overflow-x-auto">
          <DialogHeader className="flex flex-row justify-between mx-8">
            <DialogTitle>
              Informações completas - {military.warName}
            </DialogTitle>

            {/*

            Quando eu for implementar deverá ocorrer isso:
              Ao clicar na "SquarePen" irá trocar para o "Save" e permitirá a edição de todos os campos das tabelas
              E ao clicar em "Save" irá fazer as alterações no banco de dados.

              Não esquecerrrr
             */}
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
                  <TableCell>{formatRank(military.militaryRank)}</TableCell>

                  {/* NOME */}
                  <TableCell>{military.fullName}</TableCell>

                  {/* SECAO */}
                  <TableCell>{formatSection(military.section)}</TableCell>

                  {/* HABILITACOES */}
                  <TableCell>
                    {military.qualifications
                      .map((q) => q.name.toUpperCase())
                      .join(", ")}
                  </TableCell>

                  {/* MANUTENCAO */}
                  <TableCell>{military.maintenance ? "SIM" : "NÃO"}</TableCell>

                  {/* IDENTIDADE */}
                  <TableCell>{military.identity}</TableCell>

                  {/* SARAM */}
                  <TableCell>{military.saram}</TableCell>

                  {/* TELEFONE */}
                  <TableCell>{military.phone}</TableCell>

                  {/* CPF */}
                  <TableCell>{military.cpf}</TableCell>

                  {/* EMAIL */}
                  <TableCell>{military.email}</TableCell>
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
                  <TableCell>{formatDate(military.graduatedAt)}</TableCell>

                  {/* ULTIMA PROMOCAO*/}
                  <TableCell>{formatDate(military.lastPromotedAt)}</TableCell>

                  {/* DATA DE PRAÇA */}
                  <TableCell>{formatDate(military.pracaAt)}</TableCell>

                  {/* DATA DE APRESENTACAO */}
                  <TableCell>{formatDate(military.presentationDate)}</TableCell>

                  {/* TEMPO DE AREA */}
                  <TableCell>{calculateAreaTime()}</TableCell>

                  {/* TEMPO DE SERVICO */}
                  <TableCell>{calculateServiceTime()}</TableCell>

                  {/* SITUACAO */}
                  <TableCell>{military.situation}</TableCell>

                  {/* NOTA DO TESTE OPERACIONAL */}
                  <TableCell>
                    {military.operationalTests.length > 0
                      ? String(military.operationalTests[0].score)
                      : "N/A"}
                  </TableCell>
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
                  <TableCell>{military.examiner ? "SIM" : "NÃO"}</TableCell>

                  {/* DATA PROVA TEORICA */}
                  <TableCell>
                    {military.theoreticalTestDates.length > 0
                      ? formatDate(military.theoreticalTestDates[0].testAt)
                      : "N/A"}
                  </TableCell>

                  {/* LPNA */}
                  <TableCell>{military.lpna}</TableCell>

                  {/* VALIDADE DA HT */}
                  <TableCell>{formatDate(military.htValidityAt)}</TableCell>

                  {/* STATUS DA HT */}
                  <TableCell>{getDateStatus(military.htValidityAt)}</TableCell>

                  {/* INSPSAU */}
                  <TableCell>
                    {formatDate(military.inspsauValidityAt)}
                  </TableCell>

                  {/* STATUS INSPSAU */}
                  <TableCell>
                    {getDateStatus(military.inspsauValidityAt)}
                  </TableCell>

                  {/* DATA DE NASCIMENTO */}
                  <TableCell>{formatDate(military.birthDateAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
