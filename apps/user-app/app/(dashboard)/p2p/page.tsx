import { SendCard } from "../../../components/Sendcard";

export default  function P2PTransferPage() {
   return  <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Send Money</h1>
        <p className="text-sm text-muted-foreground">Instant P2P transfers — free & secure</p>
      </div>

      <div className="grid gap-6 ">
        <SendCard  />
      </div>
    </div>
}