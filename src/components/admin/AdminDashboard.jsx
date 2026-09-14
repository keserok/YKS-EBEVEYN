import React, { useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  Search,
  ArrowUpRight,
  LogOut,
  MessageCircle,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import LeadDrawer from "./LeadDrawer";

export default function AdminDashboard({ leads, onUpdateStatus, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState(null);

  // Metrics calculation
  const totalLeads = leads.length;
  const purchasedLeads = leads.filter((l) => l.status === "Satın Aldı").length;
  const contactedLeads = leads.filter((l) => l.status === "İletişime Geçildi").length;
  const newLeads = leads.filter((l) => l.status === "Yeni Talep").length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const name = (lead.agencyName || lead.parentName || "").toLowerCase();
    const phone = (lead.phone || "").toLowerCase();
    const pkg = (lead.assignedPackage || "").toLowerCase();
    const branch = (lead.studentBranch || "").toLowerCase();

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase()) ||
      pkg.includes(searchTerm.toLowerCase()) ||
      branch.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-obsidian text-architectural-white py-8 px-4 sm:px-8 md:px-12 z-20 relative">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-cinzel text-lg font-bold tracking-widest text-gold">
              KAOSTAN DÜZENE
            </span>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-xs uppercase font-mono tracking-widest text-architectural-muted">
              YKS EBEVEYN KONTROL PANELİ
            </span>
          </div>
          <p className="text-xs text-architectural-subtle font-light">
            Ebeveyn değerlendirmeleri, arketip teşhisleri ve PDF sipariş akışı
          </p>
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold/40 text-xs uppercase tracking-widest font-medium text-architectural-muted hover:text-white transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Arayüze Dön</span>
        </button>
      </header>

      {/* Metrics Section */}
      <main className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Toplam Veli */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Toplam Ebeveyn
              </span>
              <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-gold" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-architectural-white font-medium">
              {totalLeads}
            </div>
            <div className="text-[11px] text-architectural-subtle mt-2">
              Testi tamamlayan veli sayısı
            </div>
          </div>

          {/* Card 2: Satın Alanlar */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Satın Alanlar (₺299)
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-emerald-400 font-medium">
              {purchasedLeads}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-2 font-mono">
              Toplam: {purchasedLeads * 299} ₺
            </div>
          </div>

          {/* Card 3: İletişime Geçilenler */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                WhatsApp İletişim
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-blue-400 font-medium">
              {contactedLeads}
            </div>
            <div className="text-[11px] text-architectural-subtle mt-2">
              Görüşülen veliler
            </div>
          </div>

          {/* Card 4: Yeni Talepler */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Yeni Talepler
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-amber-400 font-medium">
              {newLeads}
            </div>
            <div className="text-[11px] text-architectural-subtle mt-2">
              Bekleyen veli kayıtları
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-architectural-muted/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Veli adı, telefon veya arketip ara..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-gold/50 text-xs text-architectural-white placeholder-architectural-subtle outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["ALL", "Yeni Talep", "İletişime Geçildi", "Satın Aldı"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? "bg-gold text-obsidian font-bold shadow-md"
                    : "bg-white/[0.03] text-architectural-muted hover:bg-white/[0.08]"
                }`}
              >
                {status === "ALL" ? "Tümü" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="rounded-3xl luxury-glass border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-widest text-architectural-muted bg-white/[0.02]">
                  <th className="py-4 px-6">Ebeveyn Adı</th>
                  <th className="py-4 px-6">Telefon</th>
                  <th className="py-4 px-6">Çocuğun Durumu</th>
                  <th className="py-4 px-6">Teşhis Edilen Arketip</th>
                  <th className="py-4 px-6">Skor</th>
                  <th className="py-4 px-6">Tarih</th>
                  <th className="py-4 px-6">Durum</th>
                  <th className="py-4 px-6 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="py-4 px-6 font-medium text-architectural-white flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-xs">
                        {(lead.agencyName || lead.parentName || "V")[0]}
                      </div>
                      <span>{lead.agencyName || lead.parentName}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-architectural-muted">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-6 text-architectural-muted/80">
                      {lead.studentBranch || "12. Sınıf"}
                    </td>
                    <td className="py-4 px-6 text-gold-light font-serif">
                      {lead.assignedPackage}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-architectural-white">
                      {lead.deliveryDays || "%70"}
                    </td>
                    <td className="py-4 px-6 font-mono text-architectural-subtle">
                      {lead.timestamp}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="inline-flex items-center gap-1 text-gold hover:text-gold-light text-xs font-mono group-hover:underline cursor-pointer"
                      >
                        <span>İncele</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Drawer Details Modal */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
}
