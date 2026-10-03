"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  Gift,
  HandCoins,
  HeartHandshake,
  Landmark,
  LifeBuoy,
  MapPinned,
  MessageCircleHeart,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Institution = {
  name: string;
  kind: string;
  category: string;
  city: string;
  summary: string;
  who: string;
  support: string;
  link: string;
  source: string;
};

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  reference?: string;
};

const institutions: Institution[] = [
  {
    name: "Aile ve Gençlik Fonu",
    kind: "Kamu",
    category: "Faizsiz kredi",
    city: "81 il",
    summary:
      "Evlenecek gençlere ekonomik, psikolojik ve sosyal destek akışını tek başvuru ekranında toplar.",
    who: "Nikah tarihine 2-6 ay kalan, şartları sağlayan çiftler",
    support: "2026 duyurusuna göre yaş aralığına bağlı faizsiz kredi",
    link: "https://ailegenclikfonu.aile.gov.tr/",
    source:
      "https://www.aile.gov.tr/haberler/bakanimiz-goktas-2026nin-ocak-ayi-itibariyla-artirilacak-aile-ve-genclik-fonu-kapsamindaki-evlilik-kredisi-icin-basvurulari-bugun-itibariyla-almaya-basladik/",
  },
  {
    name: "e-Devlet Evlilik Kredisi Başvurusu",
    kind: "Kamu",
    category: "Başvuru kanalı",
    city: "Online",
    summary:
      "Aile ve Sosyal Hizmetler Bakanlığı hizmeti üzerinden kimlik doğrulamalı resmi başvuru yapılır.",
    who: "Aile ve Gençlik Fonu şartlarını taşıyan çiftler",
    support: "Resmi başvuru, değerlendirme ve süreç takibi",
    link: "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-yeni-evlenecekler-icin-evlilik-kredisi-basvurusu",
    source:
      "https://www.turkiye.gov.tr/aile-ve-sosyal-hizmetler-yeni-evlenecekler-icin-evlilik-kredisi-basvurusu",
  },
  {
    name: "Çeyiz Hesabı Devlet Katkısı",
    kind: "Banka/Kamu",
    category: "Birikim desteği",
    city: "Banka şubeleri",
    summary:
      "Düzenli ödeme yapılan çeyiz hesabına evlilik sonrası devlet katkısı alınabilen birikim modeli.",
    who: "Uzun vadeli birikim yapan gençler",
    support: "2026 için ödeme süresine göre yüzde 20-25 devlet katkısı",
    link: "https://www.ziraatbank.com.tr/tr/bireysel/mevduat/vadeli-hesaplar/vadeli-tl-mevduat-hesaplari/ceyiz-hesabi",
    source: "https://aile.gov.tr/btgmd/e-hizmetler-yeni/ceyiz-yardimi/",
  },
  {
    name: "Karz-ı Hasen Vakfı",
    kind: "Vakıf",
    category: "Faizsiz borç",
    city: "Online başvuru",
    summary:
      "Evlilik hazırlığında maddi imkana erişemeyen gençlere karz-ı hasen ilkesiyle destek sunar.",
    who: "18-33 yaş aralığında, ilk evliliğini yapacak adaylar",
    support: "Faizsiz borçlandırma, rehberlik ve danışmanlık yönlendirmesi",
    link: "https://karzihasenvakfi.com/",
    source: "https://karzihasenvakfi.com/sikca-sorulan-sorular",
  },
  {
    name: "Mehir Vakfı",
    kind: "Vakıf",
    category: "Ayni destek",
    city: "Konya merkezli",
    summary:
      "Gençleri Evlendirme ve Mehir Vakfı, maddi imkanı sınırlı çiftlere düğün/eşya desteği odağıyla çalışır.",
    who: "İlk evliliğini yapacak, ihtiyaç sahibi nişanlı çiftler",
    support: "Beyaz eşya ve ev kurulumuna yönelik ayni destek paketleri",
    link: "https://mehir.org/",
    source: "https://mehir.org/",
  },
  {
    name: "Türkiye Diyanet Vakfı",
    kind: "Vakıf/Kamu iş birliği",
    category: "Hibe desteği",
    city: "Proje bazlı",
    summary:
      "İki İnsan Bir Hayat projesiyle duyurulan evlilik desteği, dönemsel kontenjan ve şartlarla yürütülür.",
    who: "Duyurulan proje şartlarını taşıyan genç çiftler",
    support: "2026 haberine göre belirli kontenjanda geri ödemesiz evlilik desteği",
    link: "https://diyanet.gov.tr/tr-tr/Kurumsal/Detay/38491",
    source: "https://diyanet.gov.tr/tr-tr/Kurumsal/Detay/38491",
  },
  {
    name: "Aile Danışmanlığı Hizmeti",
    kind: "Kamu",
    category: "Danışmanlık",
    city: "81 il",
    summary:
      "Aile danışmanlığı, bireysel danışmanlık ve evlilik öncesi danışmanlık hizmetlerini kapsar.",
    who: "Evliliğe hazırlanan veya evliliğin ilk yıllarındaki bireyler",
    support: "Sosyal Hizmet Merkezleri ve e-Devlet üzerinden ücretsiz başvuru",
    link: "https://www.turkiye.gov.tr/ashb-aile-danismanligi-basvurusu",
    source:
      "https://aile.gov.tr/sss/aile-ve-toplum-hizmetleri-genel-mudurlugu/egitim-ve-danismanlik-hizmetleri/",
  },
  {
    name: "Evlilik Öncesi Eğitim Programı",
    kind: "Kamu",
    category: "Eğitim",
    city: "İl müdürlükleri",
    summary:
      "İletişim, problem çözme, aile hukuku, sağlık ve evlilik uyumu başlıklarında eğitim programı.",
    who: "Aile kurmayı planlayan yetişkinler ve nişanlı çiftler",
    support: "Aile ve Sosyal Hizmetler İl Müdürlükleri veya Sosyal Hizmet Merkezleri",
    link: "https://aile.gov.tr/athgm/uygulamalar/",
    source:
      "https://www.aile.gov.tr/media/316001/evlilik-oncesi-egitim.pdf",
  },
  {
    name: "Sağlık Bakanlığı Evlilik Öncesi Danışmanlık",
    kind: "Kamu",
    category: "Sağlık",
    city: "Aile hekimliği",
    summary:
      "Üreme sağlığı, kalıtsal hastalıklar, bulaşıcı hastalıklar ve gebelik öncesi danışmanlık başlıklarını içerir.",
    who: "Evlilik öncesi sağlık raporu ve danışmanlık ihtiyacı olan çiftler",
    support: "Aile hekimi ve il/ilçe sağlık müdürlüğü kanalları",
    link: "https://www.saglik.gov.tr/TR-99371/saglik-hizmetleri-genel-mudurlugu.html",
    source:
      "https://ezinesm.saglik.gov.tr/TR-356181/ureme-sagligi-danismanligi.html",
  },
  {
    name: "Yerel Yönetim Evlilik Destekleri",
    kind: "Belediye",
    category: "Yerel destek",
    city: "Şehir bazlı",
    summary:
      "Bazı belediyeler ihtiyaç analizi sonrası nakdi destek, sosyal yardım veya rehberlik sağlayabilir.",
    who: "İkamet, gelir ve nikah tarihi şartını sağlayan çiftler",
    support: "Şehir bazlı sosyal destek başvurusu; Ünsiyet uygun belediye kanalına yönlendirir",
    link: "https://sosyalhizmetler.ibb.gov.tr/haberdetay.aspx?ID=11193",
    source: "https://sosyalhizmetler.ibb.gov.tr/haberdetay.aspx?ID=11193",
  },
];

const filters = [
  "Tümü",
  "Kamu",
  "Vakıf",
  "Faizsiz kredi",
  "Ayni destek",
  "Eğitim",
  "Danışmanlık",
  "Yerel destek",
];

const supportOptions = [
  "Faizsiz kredi / karz-ı hasen",
  "Eşya ve çeyiz desteği",
  "Eğitim ve mentorluk",
  "Psikolojik danışmanlık",
  "Sağlık ve resmi süreç yönlendirmesi",
];

const guidanceItems: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: Building2,
    title: "Kurum taraması",
    copy: "Şartlarınıza en yakın kamu, vakıf ve yerel destek kapıları listelenir.",
  },
  {
    icon: BookOpenCheck,
    title: "Eğitim modülü",
    copy: "İletişim, aile hukuku ve sağlıklı başlangıç başlıkları net bir sıraya alınır.",
  },
  {
    icon: MessageCircleHeart,
    title: "Danışmanlık",
    copy: "Aile danışmanlığı, psikolojik destek ve mentorlük ihtiyaçları ayrıştırılır.",
  },
  {
    icon: LifeBuoy,
    title: "Takip",
    copy: "Başvuru, belge ve görüşme adımları tek referans koduyla takip edilebilir.",
  },
];

const trustItems: Array<{
  icon: LucideIcon;
  title: string;
  copy: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Kaynaklı bilgi",
    copy: "Her kartta resmi sayfa ve kaynak bağlantısı bulunur.",
  },
  {
    icon: Sparkles,
    title: "Genç deneyim",
    copy: "Mobilde hızlı, sade ve tek elle kullanılabilir akış.",
  },
  {
    icon: HeartHandshake,
    title: "Dayanışma",
    copy: "Başvuru sahipleri ve bağışçılar aynı çatı altında buluşur.",
  },
];

const initialSubmitState: SubmitState = {
  status: "idle",
  message: "",
};

function fieldValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function submitPayload(
  endpoint: string,
  payload: Record<string, unknown>
) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as {
    reference?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error ?? "Kayıt alınamadı.");
  }

  return data.reference ?? "";
}

export default function UnsiyetHome() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Tümü");
  const [supportTypes, setSupportTypes] = useState<string[]>([
    supportOptions[0],
    supportOptions[1],
  ]);
  const [applicationPermission, setApplicationPermission] = useState(false);
  const [donorPermission, setDonorPermission] = useState(false);
  const [applicationState, setApplicationState] =
    useState<SubmitState>(initialSubmitState);
  const [donorState, setDonorState] = useState<SubmitState>(initialSubmitState);

  const filteredInstitutions = useMemo(() => {
    const loweredQuery = query.toLocaleLowerCase("tr");
    return institutions.filter((institution) => {
      const matchesQuery = [
        institution.name,
        institution.summary,
        institution.category,
        institution.kind,
        institution.city,
      ]
        .join(" ")
        .toLocaleLowerCase("tr")
        .includes(loweredQuery);
      const matchesFilter =
        filter === "Tümü" ||
        institution.kind.includes(filter) ||
        institution.category.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  function toggleSupport(option: string) {
    setSupportTypes((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  }

  async function handleApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplicationState({ status: "submitting", message: "Başvurunuz alınıyor." });

    try {
      const formData = new FormData(event.currentTarget);
      const reference = await submitPayload("/api/applications", {
        fullName: fieldValue(formData, "fullName"),
        phone: fieldValue(formData, "phone"),
        email: fieldValue(formData, "email"),
        city: fieldValue(formData, "city"),
        ageRange: fieldValue(formData, "ageRange"),
        weddingWindow: fieldValue(formData, "weddingWindow"),
        monthlyIncome: fieldValue(formData, "monthlyIncome"),
        notes: fieldValue(formData, "notes"),
        supportTypes,
        contactPermission: applicationPermission,
      });
      event.currentTarget.reset();
      setSupportTypes([supportOptions[0], supportOptions[1]]);
      setApplicationPermission(false);
      setApplicationState({
        status: "success",
        message:
          "Ön başvurunuz kaydedildi. Ünsiyet ekibi sizi uygun kurum yönlendirmesi için arayabilir.",
        reference,
      });
    } catch (error) {
      setApplicationState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Başvuru şu anda alınamadı.",
      });
    }
  }

  async function handleDonor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDonorState({ status: "submitting", message: "Bağışçı kaydınız alınıyor." });

    try {
      const formData = new FormData(event.currentTarget);
      const reference = await submitPayload("/api/donors", {
        donorType: fieldValue(formData, "donorType"),
        fullName: fieldValue(formData, "fullName"),
        phone: fieldValue(formData, "phone"),
        email: fieldValue(formData, "email"),
        city: fieldValue(formData, "city"),
        supportChannel: fieldValue(formData, "supportChannel"),
        amountRange: fieldValue(formData, "amountRange"),
        frequency: fieldValue(formData, "frequency"),
        message: fieldValue(formData, "message"),
        contactPermission: donorPermission,
      });
      event.currentTarget.reset();
      setDonorPermission(false);
      setDonorState({
        status: "success",
        message:
          "Bağışçı niyetiniz kaydedildi. Resmi tahsilat kanalı ve makbuz süreci için ekip sizinle iletişime geçebilir.",
        reference,
      });
    } catch (error) {
      setDonorState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Bağışçı kaydı şu anda alınamadı.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e3f8ee_0,#f7fbf8_34%,#ffffff_70%)] text-[#102c2f]">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#anasayfa" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#0a6b67] text-white shadow-sm">
              <HeartHandshake className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold">Ünsiyet</span>
              <span className="block text-xs text-[#5c706e]">
                Evlilik Destek Merkezi
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-sm font-medium text-[#4f6563] md:flex">
            <a href="#kurumlar">Kurumlar</a>
            <a href="#rehberlik">Rehberlik</a>
            <a href="#formlar">Başvuru</a>
            <a href="#kaynaklar">Kaynaklar</a>
          </nav>
          <Button asChild className="bg-[#0a6b67] text-white hover:bg-[#075b58]">
            <a href="#formlar">
              <ClipboardList className="size-4" />
              Ön başvuru
            </a>
          </Button>
        </div>
      </header>

      <section
        id="anasayfa"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-12"
      >
        <div className="flex flex-col justify-center">
          <Badge className="mb-5 rounded-md bg-[#e6f6ef] px-3 py-1 text-[#0a6b67]">
            3 Ekim 2026 kaynak kontrolüyle hazırlanmış yönlendirme merkezi
          </Badge>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal text-[#082b2d] sm:text-5xl lg:text-6xl">
            Evliliğe hazırlanan gençler için tek noktadan destek ağı.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4f6563]">
            Ünsiyet Derneği; faizsiz kredi, çeyiz/eşya desteği, resmi başvuru,
            eğitim, aile danışmanlığı ve bağışçı dayanışmasını sade bir akışta
            bir araya getirir.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-[#0a6b67] text-white hover:bg-[#075b58]">
              <a href="#kurumlar">
                <Search className="size-4" />
                Destek bul
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#b8d7cf] bg-white">
              <a href="#formlar">
                <Gift className="size-4" />
                Bağışçı ol
              </a>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["10+", "kurum ve kanal"],
              ["2 form", "başvuru + bağışçı"],
              ["4 alan", "ekonomi, eğitim, sağlık, danışmanlık"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="rounded-lg border border-[#d8e5df] bg-white/85 p-4 shadow-sm"
              >
                <strong className="block text-2xl text-[#0a6b67]">
                  {value}
                </strong>
                <span className="text-sm text-[#5c706e]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-white bg-white shadow-[0_24px_80px_rgba(10,107,103,0.18)]">
          <img
            src="/images/unsiyet-consultation.png"
            alt="Ünsiyet danışmanlık görüşmesinde evlilik hazırlığı yapan çift"
            className="h-full min-h-[460px] w-full object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 grid gap-3 rounded-lg border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-[#0a6b67]">
                Akıllı yönlendirme
              </p>
              <p className="mt-1 text-sm text-[#365351]">
                İhtiyacı seç, uygun kurumları gör, resmi başvuruya geç.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-[#ffe9df] text-[#b35338]">
                <ShieldCheck className="size-5" />
              </span>
              <p className="text-sm font-semibold text-[#102c2f]">
                Kaynaklı, sade, hızlı ve güven veren bir başvuru deneyimi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="kurumlar" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-[#0a6b67]">
              Kurum rehberi
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#082b2d]">
              Doğru destek kanalını dakikalar içinde bulun.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#5c706e]">
              Kartlar resmi başvuru ve kaynak sayfalarına bağlanır. Ünsiyet,
              şartları sizin adınıza kesinleştirmez; en doğru kurum kapısına
              hızlıca ulaştırır.
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6b807d]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kurum, şehir veya destek ara"
              className="h-11 rounded-lg border-[#bfd8d0] bg-white pl-10"
            />
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((item) => (
            <Button
              key={item}
              type="button"
              variant={filter === item ? "default" : "outline"}
              className={
                filter === item
                  ? "bg-[#0a6b67] text-white hover:bg-[#075b58]"
                  : "border-[#c9ded7] bg-white text-[#365351]"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredInstitutions.map((institution) => (
            <Card
              key={institution.name}
              className="rounded-lg border-[#d8e5df] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardHeader className="gap-3 px-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-lg bg-[#e7f6ef] text-[#0a6b67]">
                    {institution.kind.includes("Vakıf") ? (
                      <HandCoins className="size-5" />
                    ) : institution.kind.includes("Belediye") ? (
                      <MapPinned className="size-5" />
                    ) : (
                      <Landmark className="size-5" />
                    )}
                  </span>
                  <Badge
                    variant="outline"
                    className="rounded-md border-[#c9ded7] text-[#4f6563]"
                  >
                    {institution.category}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl leading-7">
                    {institution.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-[#5c706e]">
                    {institution.kind} · {institution.city}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-5">
                <p className="min-h-20 text-sm leading-6 text-[#365351]">
                  {institution.summary}
                </p>
                <div className="mt-4 space-y-3 rounded-lg bg-[#f6fbf8] p-4 text-sm">
                  <p>
                    <span className="font-semibold text-[#102c2f]">
                      Kimler için:{" "}
                    </span>
                    {institution.who}
                  </p>
                  <p>
                    <span className="font-semibold text-[#102c2f]">
                      Destek:{" "}
                    </span>
                    {institution.support}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild className="bg-[#0a6b67] text-white hover:bg-[#075b58]">
                    <a href={institution.link} target="_blank" rel="noreferrer">
                      Resmi sayfa
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-[#c9ded7] bg-white">
                    <a href={institution.source} target="_blank" rel="noreferrer">
                      Kaynak
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="rehberlik" className="bg-[#0b3b3c] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Badge className="rounded-md bg-white/12 text-white">
                Ünsiyet yol haritası
              </Badge>
              <h2 className="mt-4 text-3xl font-black tracking-normal">
                Sadece kaynak listesi değil, evliliğe hazırlık refakati.
              </h2>
              <p className="mt-4 leading-7 text-white/75">
                Evlilik süreci çoğu zaman ekonomik destek, resmi evrak, aile
                iletişimi, sağlık raporu ve psikolojik hazırlık gibi farklı
                başlıkları aynı anda gerektirir. Ünsiyet bu başlıkları anlaşılır
                bir sıra haline getirir.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {guidanceItems.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-lg border border-white/15 bg-white/8 p-5"
                >
                  <Icon className="size-6 text-[#78e2d3]" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/72">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="formlar" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#0a6b67]">
              Başvuru merkezi
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-[#082b2d]">
              Yardım isteyenle yardım etmek isteyeni aynı masaya çağırıyoruz.
            </h2>
            <p className="mt-4 leading-7 text-[#5c706e]">
              Bu formlar ön kayıt ve yönlendirme altyapısıdır. Online ödeme,
              makbuz, banka hesabı, KVKK metni ve dernek izinleri kurumsal
              süreçler netleşince aynı akışa bağlanabilir.
            </p>
            <div className="mt-6 rounded-lg border border-[#d8e5df] bg-white p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 text-[#0a6b67]" />
                <p className="text-sm leading-6 text-[#365351]">
                  Gönderimden sonra sistem bir referans kodu üretir. Bu kod,
                  ileride ekip içi takip ve başvuru durum sorgulaması için
                  kullanılabilir.
                </p>
              </div>
            </div>
          </div>

          <Card className="rounded-lg border-[#d8e5df] bg-white shadow-xl">
            <CardContent className="px-4 py-4 sm:px-6">
              <Tabs defaultValue="application">
                <TabsList className="mb-6 h-auto w-full rounded-lg bg-[#edf7f2] p-1">
                  <TabsTrigger value="application" className="h-11 rounded-md">
                    <UsersRound className="size-4" />
                    Destek başvurusu
                  </TabsTrigger>
                  <TabsTrigger value="donor" className="h-11 rounded-md">
                    <HandCoins className="size-4" />
                    Bağışçı formu
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="application">
                  <form className="grid gap-4" onSubmit={handleApplication}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Ad Soyad" name="fullName" required />
                      <Field label="Telefon" name="phone" type="tel" required />
                      <Field label="E-posta" name="email" type="email" required />
                      <Field label="Şehir" name="city" required />
                      <SelectField
                        label="Yaş aralığı"
                        name="ageRange"
                        options={["18-25", "26-29", "30-33", "34-40", "40+"]}
                      />
                      <SelectField
                        label="Nikah zamanı"
                        name="weddingWindow"
                        options={["0-2 ay", "2-6 ay", "6-12 ay", "Tarih netleşmedi"]}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-[#264845]">
                        İhtiyaç alanları
                      </Label>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {supportOptions.map((option) => (
                          <label
                            key={option}
                            className="flex items-start gap-3 rounded-lg border border-[#d8e5df] bg-[#f8fcfa] p-3 text-sm"
                          >
                            <Checkbox
                              checked={supportTypes.includes(option)}
                              onCheckedChange={() => toggleSupport(option)}
                              className="mt-0.5"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <SelectField
                      label="Aylık hane geliri"
                      name="monthlyIncome"
                      options={[
                        "Belirtmek istemiyorum",
                        "Asgari ücret altı",
                        "Asgari ücret civarı",
                        "2 asgari ücret civarı",
                        "2 asgari ücret üstü",
                      ]}
                    />
                    <div>
                      <Label htmlFor="notes" className="text-sm font-semibold text-[#264845]">
                        Kısa durum notu
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Örn. resmi nikah tarihi, eşya ihtiyacı, eğitim/danışmanlık talebi"
                        className="mt-2 min-h-28 rounded-lg border-[#bfd8d0]"
                      />
                    </div>
                    <Permission
                      checked={applicationPermission}
                      onChange={setApplicationPermission}
                      label="Ünsiyet Derneği'nin başvuru yönlendirmesi için benimle iletişime geçmesini kabul ediyorum."
                    />
                    <SubmitNotice state={applicationState} />
                    <Button
                      disabled={applicationState.status === "submitting"}
                      className="h-11 bg-[#0a6b67] text-white hover:bg-[#075b58]"
                    >
                      <ClipboardList className="size-4" />
                      Başvuruyu gönder
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="donor">
                  <form className="grid gap-4" onSubmit={handleDonor}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <SelectField
                        label="Bağışçı türü"
                        name="donorType"
                        options={["Bireysel", "Aile", "Şirket", "Vakıf / STK"]}
                      />
                      <Field label="Ad Soyad / Kurum" name="fullName" required />
                      <Field label="Telefon" name="phone" type="tel" required />
                      <Field label="E-posta" name="email" type="email" required />
                      <Field label="Şehir" name="city" required />
                      <SelectField
                        label="Destek kanalı"
                        name="supportChannel"
                        options={[
                          "Nakdi bağış",
                          "Eşya desteği",
                          "Eğitim sponsorluğu",
                          "Mentorlük",
                          "Kurumsal iş birliği",
                        ]}
                      />
                      <SelectField
                        label="Bağış aralığı"
                        name="amountRange"
                        options={[
                          "Görüşmek istiyorum",
                          "1.000-5.000 TL",
                          "5.000-25.000 TL",
                          "25.000 TL üstü",
                          "Ayni destek",
                        ]}
                      />
                      <SelectField
                        label="Sıklık"
                        name="frequency"
                        options={["Tek seferlik", "Aylık", "Proje bazlı", "Ramazan / dönemsel"]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-semibold text-[#264845]">
                        Mesajınız
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Hangi alanda destek olmak istersiniz?"
                        className="mt-2 min-h-28 rounded-lg border-[#bfd8d0]"
                      />
                    </div>
                    <Permission
                      checked={donorPermission}
                      onChange={setDonorPermission}
                      label="Ünsiyet Derneği'nin bağışçı görüşmesi ve resmi tahsilat süreci için benimle iletişime geçmesini kabul ediyorum."
                    />
                    <SubmitNotice state={donorState} />
                    <Button
                      disabled={donorState.status === "submitting"}
                      className="h-11 bg-[#0a6b67] text-white hover:bg-[#075b58]"
                    >
                      <Gift className="size-4" />
                      Bağışçı niyetini gönder
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="kaynaklar" className="border-t border-[#d8e5df] bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-bold uppercase text-[#0a6b67]">
                Güven notu
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal text-[#082b2d]">
                Ünsiyet, resmi karar merciinin yerine geçmez.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5c706e]">
                Başvuru şartları, kontenjanlar ve tutarlar kurumların dönemsel
                kararlarıyla değişebilir. Bu site yönlendirme, ön eleme ve
                danışmanlık merkezi olarak çalışır.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {trustItems.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-lg border border-[#d8e5df] bg-[#f8fcfa] p-4"
                >
                  <Icon className="size-5 text-[#0a6b67]" aria-hidden="true" />
                  <h3 className="mt-3 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#5c706e]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-semibold text-[#264845]">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 h-11 rounded-lg border-[#bfd8d0]"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm font-semibold text-[#264845]">
        {label}
      </Label>
      <NativeSelect
        id={name}
        name={name}
        required
        className="mt-2 h-11 w-full rounded-lg border-[#bfd8d0] bg-white"
      >
        {options.map((option) => (
          <NativeSelectOption key={option} value={option}>
            {option}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

function Permission({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-[#d8e5df] bg-[#f8fcfa] p-3 text-sm leading-6 text-[#365351]">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
        className="mt-1"
      />
      <span>{label}</span>
    </label>
  );
}

function SubmitNotice({ state }: { state: SubmitState }) {
  if (state.status === "idle") {
    return null;
  }

  const colorClass =
    state.status === "success"
      ? "border-[#bfe2d4] bg-[#f1fbf5] text-[#0d5f42]"
      : state.status === "error"
        ? "border-[#f4c9be] bg-[#fff5f1] text-[#92412a]"
        : "border-[#d8e5df] bg-[#f8fcfa] text-[#365351]";

  return (
    <div className={`rounded-lg border p-3 text-sm ${colorClass}`} role="status">
      <p>{state.message}</p>
      {state.reference ? (
        <p className="mt-1 font-bold">Referans kodu: {state.reference}</p>
      ) : null}
    </div>
  );
}
