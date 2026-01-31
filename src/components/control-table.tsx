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
import { useEffect, useState } from "react";
import { getMilitaries } from "@/actions/get-militaries";
import { toast } from "sonner";

type MilitaryResult = Awaited<ReturnType<typeof getMilitaries>>;
type Military = NonNullable<MilitaryResult["data"]>[number];

export default function ControlTable() {
  const [militaries, setMilitaries] = useState<Military[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadMilitaries = async () => {
    setLoading(true);
    setError(null);
    const result = await getMilitaries();
    if (result.success && result.data) {
      setMilitaries(result.data);
    } else {
      setError(result.error || "Erro ao carregar dados");
      toast.error(result.error || "Erro ao carregar dados");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMilitaries();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getDateStatus = (date: Date) => {
    const today = new Date();
    const validityDate = new Date(date);
    const diffDays = Math.ceil(
      (validityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "VENCIDO";
    if (diffDays <= 30) return "VENCENDO";
    return "OK";
  };

  const formatRank = (rank: string) => {
    return rank.replace("Rank_", "");
  };

  const formatSection = (section: string) => {
    return section.replace("DTCEA_", "DTCEA-");
  };

  const filteredMilitaries = militaries.filter((military) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      military.fullName.toLowerCase().includes(searchLower) ||
      military.warName.toLowerCase().includes(searchLower) ||
      military.section.toLowerCase().includes(searchLower) ||
      military.lpna.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="flex justify-between items-baseline">
        <Input
          className="w-2xl ml-4 mt-4 rounded-full"
          placeholder="Pesquise algo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-6 mx-4">
          {/* Futuramente gerar novo component */}
          <Button className="rounded-full">Gerar PDF</Button>

          {/* Cadastra um novo militar no banco de dados */}
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : filteredMilitaries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="text-center">
                Nenhum militar encontrado
              </TableCell>
            </TableRow>
          ) : (
            filteredMilitaries.map((military) => (
              <TableRow key={military.id}>
                {/* POSTO/GRAD */}
                <TableCell>{formatRank(military.militaryRank)}</TableCell>

                {/* NOME */}
                <TableCell>{military.warName}</TableCell>

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

                {/* SITUACAO */}
                <TableCell>{military.situation}</TableCell>

                {/* LPNA */}
                <TableCell>{military.lpna}</TableCell>

                {/* VALIDADE DA HT */}
                <TableCell>{formatDate(military.htValidityAt)}</TableCell>

                {/* STATUS DA HT */}
                <TableCell>{getDateStatus(military.htValidityAt)}</TableCell>

                {/* VALIDADE DA INSPSAU */}
                <TableCell>{formatDate(military.inspsauValidityAt)}</TableCell>

                {/* STATUS DA INSPSAU */}
                <TableCell>
                  {getDateStatus(military.inspsauValidityAt)}
                </TableCell>

                {/* INFORMACOES COMPLETAS */}
                <TableCell>
                  <InfoButton military={military} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}
