"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./label";
import React from "react";
import { Field } from "./field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { Checkbox } from "./checkbox";
import { toast } from "sonner";
import newMilitary from "@/actions/new-military";

export default function AddMilitary() {
  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }
  const [selectedQualifications, setSelectedQualifications] = React.useState<
    string[]
  >([]);

  // add military states
  const [grad, setGrad] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [warName, setWarName] = React.useState("");
  const [section, setSection] = React.useState("");
  const [maintenance, setMaintenance] = React.useState("");
  const [identity, setIdentity] = React.useState("");
  const [saram, setSaram] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [graduationDate, setGraduationDate] = React.useState<Date>();
  const [lastPromotion, setLastPromotion] = React.useState<Date>();
  const [pracaDate, setPracaDate] = React.useState<Date>();
  const [presentationDate, setPresentationDate] = React.useState<Date>();
  const [situation, setSituation] = React.useState("");
  const [operationalScore, setOperationalScore] = React.useState("");
  const [examiner, setExaminer] = React.useState("");
  const [theoreticalDate, setTheoreticalDate] = React.useState<Date>();
  const [lpna, setLpna] = React.useState("");
  const [htValidity, setHtValidity] = React.useState<Date>();
  const [inspsauValidity, setInspsauValidity] = React.useState<Date>();
  const [birthDate, setBirthDate] = React.useState<Date>();

  // estados separados
  const [graduationOpen, setGraduationOpen] = React.useState(false);
  const [graduationMonth, setGraduationMonth] = React.useState<
    Date | undefined
  >();

  const [lastPromotionOpen, setLastPromotionOpen] = React.useState(false);
  const [lastPromotionMonth, setLastPromotionMonth] = React.useState<
    Date | undefined
  >();

  const [pracaOpen, setPracaOpen] = React.useState(false);
  const [pracaMonth, setPracaMonth] = React.useState<Date | undefined>();

  const [presentationOpen, setPresentationOpen] = React.useState(false);
  const [presentationMonth, setPresentationMonth] = React.useState<
    Date | undefined
  >();

  const [theoreticalOpen, setTheoreticalOpen] = React.useState(false);
  const [theoreticalMonth, setTheoreticalMonth] = React.useState<
    Date | undefined
  >();

  const [htOpen, setHtOpen] = React.useState(false);
  const [htMonth, setHtMonth] = React.useState<Date | undefined>();

  const [inspsauOpen, setInspsauOpen] = React.useState(false);
  const [inspsauMonth, setInspsauMonth] = React.useState<Date | undefined>();

  const [birthOpen, setBirthOpen] = React.useState(false);
  const [birthMonth, setBirthMonth] = React.useState<Date | undefined>();

  const qualifications = [
    { value: "afis", label: "AFIS" },
    { value: "fis", label: "FIS" },
    { value: "sar", label: "SAR" },
    { value: "dm", label: "DM" },
  ];

  const [qualificationOpen, setQualificationOpen] = React.useState(false);

  const toggleQualification = (value: string) => {
    setSelectedQualifications((prev) =>
      prev.includes(value) ? prev.filter((q) => q !== value) : [...prev, value],
    );
  };

  const handleSubmit = async () => {
    if (!fullName || !warName || !grad) {
      toast.error("Preencha os campos obrigatórios!");
      return;
    }

    if (
      !graduationDate ||
      !lastPromotion ||
      !pracaDate ||
      !presentationDate ||
      !birthDate ||
      !htValidity ||
      !inspsauValidity
    ) {
      toast.error("Preencha todas as datas!");
      return;
    }

    const result = await newMilitary({
      militaryRank: grad,
      fullName: fullName,
      warName: warName,
      section: section,
      situation: situation,
      qualifications: selectedQualifications,
      maintenance: maintenance === "yes",
      identity: identity,
      saram: saram,
      cpf: cpf,
      lpna: lpna,
      phone: phone,
      email: email,
      birthDateAt: birthDate,
      graduatedAt: graduationDate,
      lastPromotedAt: lastPromotion,
      pracaAt: pracaDate,
      presentationDate: presentationDate,
      htValidityAt: htValidity,
      inspsauValidityAt: inspsauValidity,
      examiner: examiner,
      areaTimeAt: presentationDate,
      operationalScore: operationalScore,
      theoreticalDate: theoreticalDate,
    });

    if (result.success) {
      toast.success("Militar cadastrado com sucesso!");

      setGrad("");
      setFullName("");
      setWarName("");
      setSection("");
      setMaintenance("");
      setIdentity("");
      setSaram("");
      setPhone("");
      setCpf("");
      setEmail("");
      setGraduationDate(undefined);
      setLastPromotion(undefined);
      setPracaDate(undefined);
      setPresentationDate(undefined);
      setSituation("");
      setOperationalScore("");
      setExaminer("");
      setTheoreticalDate(undefined);
      setLpna("");
      setHtValidity(undefined);
      setInspsauValidity(undefined);
      setBirthDate(undefined);
      setSelectedQualifications([]);
    } else {
      toast.error(result.error || "Erro ao cadastrar militar");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full cursor-pointer">
            Adicionar militar
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar militar</DialogTitle>
            <DialogDescription>
              {" "}
              Insira aqui as informações do militar
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-24">
            <div id="col-1" className="flex flex-col gap-4">
              <Label htmlFor="grad">POSTO/GRAD</Label>
              <Input
                id="grad"
                placeholder="SO"
                value={grad}
                onChange={(e) => setGrad(e.target.value)}
              />

              <Label htmlFor="name">NOME COMPLETO</Label>
              <Input
                id="name"
                placeholder="FULANO DE TAL"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Label htmlFor="war-name">NOME DE GUERRA</Label>
              <Input
                id="war-name"
                placeholder="FULANO"
                value={warName}
                onChange={(e) => setWarName(e.target.value)}
              />

              <Label htmlFor="section">SEÇÃO</Label>
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="com">COM</SelectItem>
                  <SelectItem value="civa">CIVA</SelectItem>
                  <SelectItem value="fis">FIS</SelectItem>
                  <SelectItem value="sar">SAR</SelectItem>
                  <SelectItem value="opg">OPG</SelectItem>
                  <SelectItem value="dt">DT</SelectItem>
                  <SelectItem value="dtcea-br">DTCEA-BE</SelectItem>
                  <SelectItem value="dtcea-bv">DTCEA-BV</SelectItem>
                  <SelectItem value="dtcea-pv">DTCEA-PV</SelectItem>
                  <SelectItem value="dtcea-gm">DTCEA-GM</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="qualifications">HABILITAÇÕES</Label>
              <Popover
                open={qualificationOpen}
                onOpenChange={setQualificationOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[180px] justify-start font-normal"
                  >
                    {selectedQualifications.length > 0
                      ? selectedQualifications
                          .map(
                            (val) =>
                              qualifications.find((q) => q.value === val)
                                ?.label,
                          )
                          .join(", ")
                      : "Selecione"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="start">
                  <div className="flex flex-col gap-2">
                    {qualifications.map((qual) => (
                      <Field key={qual.value} orientation="horizontal">
                        <Checkbox
                          id={qual.value}
                          checked={selectedQualifications.includes(qual.value)}
                          onCheckedChange={() =>
                            toggleQualification(qual.value)
                          }
                        />
                        <Label htmlFor={qual.value}>{qual.label}</Label>
                      </Field>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Label htmlFor="maintenance">MANUTENÇÃO</Label>
              <Select value={maintenance} onValueChange={setMaintenance}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">SIM</SelectItem>
                  <SelectItem value="no">NÃO</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="identity">IDENTIDADE</Label>
              <Input
                id="identity"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
              />

              <Label htmlFor="saram">SARAM</Label>
              <Input
                id="saram"
                value={saram}
                onChange={(e) => setSaram(e.target.value)}
              />

              <Label htmlFor="phone">TELEFONE</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div id="col-2" className="flex flex-col gap-4">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <Label htmlFor="email">EMAIL</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="graduation-date">DATA DA FORMATURA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="graduation-date"
                    value={formatDate(graduationDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setGraduationDate(date);
                        setGraduationMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setGraduationOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover
                      open={graduationOpen}
                      onOpenChange={setGraduationOpen}
                    >
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={graduationDate}
                          month={graduationMonth}
                          onMonthChange={setGraduationMonth}
                          onSelect={(date) => {
                            setGraduationDate(date);
                            setGraduationOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="last-promotion">ÚLTIMA PROMOÇÃO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="last-promotion"
                    value={formatDate(lastPromotion)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setLastPromotion(date);
                        setLastPromotionMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setLastPromotionOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover
                      open={lastPromotionOpen}
                      onOpenChange={setLastPromotionOpen}
                    >
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={lastPromotion}
                          month={lastPromotionMonth}
                          onMonthChange={setLastPromotionMonth}
                          onSelect={(date) => {
                            setLastPromotion(date);
                            setLastPromotionOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="praca-date">DATA DE PRAÇA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="praca-date"
                    value={formatDate(pracaDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setPracaDate(date);
                        setPracaMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setPracaOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={pracaOpen} onOpenChange={setPracaOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={pracaDate}
                          month={pracaMonth}
                          onMonthChange={setPracaMonth}
                          onSelect={(date) => {
                            setPracaDate(date);
                            setPracaOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="presentation-date">DATA DE APRESENTAÇÃO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="presentation-date"
                    value={formatDate(presentationDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setPresentationDate(date);
                        setPresentationMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setPresentationOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover
                      open={presentationOpen}
                      onOpenChange={setPresentationOpen}
                    >
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={presentationDate}
                          month={presentationMonth}
                          onMonthChange={setPresentationMonth}
                          onSelect={(date) => {
                            setPresentationDate(date);
                            setPresentationOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              {/* Vai ser calculado no backend tempo_de_area = data_atual - data_de_apresentacao */}

              {/* 
              <Label htmlFor="area-time">TEMPO DE ÁREA</Label>
              <Input id="area-time" />
              */}

              {/* Vai ser calculado no backend tempo_de_servico = data_atual - data_de_praca */}

              {/*
              <Label htmlFor="duty-time">TEMPO DE SERVIÇO</Label>
              <Input id="duty-time" /> 
              */}

              <Label htmlFor="situation">SITUAÇÃO</Label>
              <Select value={situation} onValueChange={setSituation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expediente">EXPEDIENTE</SelectItem>
                  <SelectItem value="escala">ESCALA</SelectItem>
                  <SelectItem value="nao-aplicavel">NÃO APLICÁVEL</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="operational-score-exam">
                NOTA TESTE OPERACIONAL
              </Label>
              <Input
                id="operational-score-exam"
                value={operationalScore}
                onChange={(e) => setOperationalScore(e.target.value)}
              />

              <Label htmlFor="examiner">AVALIADOR</Label>
              <Select value={examiner} onValueChange={setExaminer}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">SIM</SelectItem>
                  <SelectItem value="no">NÃO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div id="col-3" className="flex flex-col gap-4">
              <Label htmlFor="theoretical-date-exam">DATA PROVA TEÓRICA</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="theoretical-date-exam"
                    value={formatDate(theoreticalDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setTheoreticalDate(date);
                        setTheoreticalMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setTheoreticalOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover
                      open={theoreticalOpen}
                      onOpenChange={setTheoreticalOpen}
                    >
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={theoreticalDate}
                          month={theoreticalMonth}
                          onMonthChange={setTheoreticalMonth}
                          onSelect={(date) => {
                            setTheoreticalDate(date);
                            setTheoreticalOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="lpna">LPNA</Label>
              <Input
                id="lpna"
                value={lpna}
                onChange={(e) => setLpna(e.target.value)}
              />

              <Label htmlFor="ht-validity">VALIDADE HT</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="ht-validity"
                    value={formatDate(htValidity)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setHtValidity(date);
                        setHtMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setHtOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={htOpen} onOpenChange={setHtOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={htValidity}
                          month={htMonth}
                          onMonthChange={setHtMonth}
                          onSelect={(date) => {
                            setHtValidity(date);
                            setHtOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="inspsau-validity">VALIDADE INSPSAU</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="inspsau-validity"
                    value={formatDate(inspsauValidity)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setInspsauValidity(date);
                        setInspsauMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setInspsauOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={inspsauOpen} onOpenChange={setInspsauOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={inspsauValidity}
                          month={inspsauMonth}
                          onMonthChange={setInspsauMonth}
                          onSelect={(date) => {
                            setInspsauValidity(date);
                            setInspsauOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Label htmlFor="birth-date">DATA DE NASCIMENTO</Label>
              <Field className="mx-auto w-48">
                <InputGroup>
                  <InputGroupInput
                    id="birth-date"
                    value={formatDate(birthDate)}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      if (isValidDate(date)) {
                        setBirthDate(date);
                        setBirthMonth(date);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setBirthOpen(true);
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <Popover open={birthOpen} onOpenChange={setBirthOpen}>
                      <PopoverTrigger asChild>
                        <InputGroupButton
                          id="date-picker"
                          variant="ghost"
                          size="icon-xs"
                          aria-label="Select date"
                        >
                          <CalendarIcon />
                          <span className="sr-only">Selecione uma data</span>
                        </InputGroupButton>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                      >
                        <Calendar
                          mode="single"
                          selected={birthDate}
                          month={birthMonth}
                          onMonthChange={setBirthMonth}
                          onSelect={(date) => {
                            setBirthDate(date);
                            setBirthOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="rounded-full w-32" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
